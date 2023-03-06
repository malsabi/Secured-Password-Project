// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
require("dotenv").config();

const express = require("express");
var cors = require('cors');
const app = express();
var mysql = require('mysql');
// const pdf = require('./pdf.js')
const fs = require('fs')
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const bcrypt = require("bcrypt")

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/images', express.static(__dirname + 'public/images'))

app.use(cors())

// Open Database connection
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "secure_password"
});

connection.connect(function(err) {
	if (err) return console.log(err);
	console.log("Connected!");
});

function returnTimestamp(){
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
	const day = ('0' + currentDate.getDate()).slice(-2);
	const hours = ('0' + currentDate.getHours()).slice(-2);
	const minutes = ('0' + currentDate.getMinutes()).slice(-2);
	const seconds = ('0' + currentDate.getSeconds()).slice(-2);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function select_password_information(password_id){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT
		s.student_id, s.student_major, s.student_year, s.student_name,
		p.password_id, p.strength as password_strength, p.complexity as password_complexity, p.duration as password_duration 
		FROM
		student as s
		JOIN
		password as p
		ON
		s.student_id = p.student_id
		WHERE
		p.password_id = ${password_id}`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function select_major_weakest_passwords(){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT s.student_major,
		AVG(CASE WHEN p.strength = 'strong' THEN 4
				 WHEN p.strength = 'good' THEN 3
				 WHEN p.strength = 'fair' THEN 2
				 WHEN p.strength = 'weak' THEN 1
			END) AS avg_strength
		FROM student s
		JOIN password p ON s.student_id = p.student_id
		GROUP BY s.student_major
		ORDER BY avg_strength ASC
		LIMIT 1;
		`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function select_major_strongest_passwords(){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT s.student_major,
		AVG(CASE WHEN p.strength = 'strong' THEN 4
				 WHEN p.strength = 'good' THEN 3
				 WHEN p.strength = 'fair' THEN 2
				 WHEN p.strength = 'weak' THEN 1
			END) AS avg_strength
		FROM student s
		JOIN password p ON s.student_id = p.student_id
		GROUP BY s.student_major
		ORDER BY avg_strength DESC
		LIMIT 1;
		`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function select_passwords_based_on_student(){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT s.student_id, s.student_name, s.student_year, s.student_major, s.attempts, 
		COUNT(*) AS num_tests,
		MIN(p.timestamp) AS first_test_timestamp,
		MAX(p.timestamp) AS last_test_timestamp,
		AVG(CASE WHEN p.strength = 'strong' THEN 4
				 WHEN p.strength = 'good' THEN 3
				 WHEN p.strength = 'fair' THEN 2
				 WHEN p.strength = 'weak' THEN 1
			END) AS avg_strength
		FROM student s
		JOIN password p ON s.student_id = p.student_id
		GROUP BY s.student_id, s.student_name, s.student_year, s.student_major, s.attempts;`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function select_groupBy_password_strength(){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT strength, COUNT(*) AS count
		FROM password
		GROUP BY strength
		ORDER BY
		  CASE strength
			WHEN 'weak' THEN 1
			WHEN 'fair' THEN 2
			WHEN 'good' THEN 3
			WHEN 'strong' THEN 4
		  END;`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function adminLogin(email){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT * FROM admin WHERE email = '${email.toLowerCase()}'`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function isStudentValid(student_id){
	return new Promise((resolve, reject) => {
		const selectStudent = `SELECT * FROM student WHERE student_id = '${student_id.toUpperCase()}'`

		return connection.query(selectStudent, function (err, result, fields) {
			if (err) reject(err);
			resolve(result)
		});
	})
}
async function insertStudent(student_id, student_name, student_year, student_major){ // TODO: Add promise to the function
	return new Promise((resolve, reject) => {
		const insertStudent = `INSERT INTO \`student\` (\`student_id\`, \`student_name\`, \`student_year\`, \`student_major\`, \`attempts\`) VALUES ('${student_id}', '${student_name}', '${student_year}', '${student_major}', '0')`;
		return connection.query(insertStudent, function (err, result) {
			if (err) reject(err);
			resolve(result);
		});
	})
}
async function insertPassword(strength, student_id, complexity, duration){
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO \`password\` (\`timestamp\`, \`strength\`, \`student_id\`, \`complexity\`, \`duration\`) VALUES ('${returnTimestamp()}', '${strength}', '${student_id}', '${complexity}', '${duration}')`;
		connection.query(sql, function (err, result) {
			if (err) reject(err);
			resolve(result);
		});
	})
}
async function update_student_attempts(student_id){
	return new Promise((resolve, reject) => {
		isStudentValid(student_id)
		.then((response) => {
			var attempts = (response[0].attempts);

			const sql = `UPDATE \`student\` SET \`attempts\` = ${attempts + 1} WHERE \`student_id\` = '${student_id}'`;
			connection.query(sql, function (err, result) {
				if (err) reject(err);
				resolve(result);
			});
		})
	})
	.catch(() => res.status(405).send({error: "System Error"}))
}

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// Middleware
app.use(express.json()); // parse json bodies in the request object


app.get("/select_major_weakest_passwords", (req, res) => {
	select_major_weakest_passwords()
	.then((response) => {
		res.send(response)
	})
	.catch((error) => res.status(405).send({error: error}))
})
app.get("/select_major_strongest_passwords", (req, res) => {
	select_major_strongest_passwords()
	.then((response) => {
		res.send(response)
	})
	.catch((error) => res.status(405).send({error: error}))
})
app.get("/select_passwords_based_on_student", (req, res) => {
	select_passwords_based_on_student()
	.then((response) => {
		res.send(response)
	})
	.catch((error) => res.status(405).send({error: error}))
})
app.get("/select_groupBy_password_strength", (req, res) => {
	select_groupBy_password_strength()
	.then((response) => {
		res.send(response)
	})
	.catch((error) => res.status(405).send({error: error}))
})

app.post("/login", (req, res) => {
	var error;
	if(!req.body.email){
		error = {...error, email: 'Email should not be empty'};
	}
	if(!req.body.password){
		error = {...error, password: 'Password should not be empty'};
	}
	if(error) return res.status(405).send({error});

	adminLogin(req.body.email)
	.then((response) => {
		if(response.length !== 0){
			var error = null;
			bcrypt
			.compare(req.body.password, response[0].password)
			.then(results => {
				if(results){
					res.send({message: "successful"})
				}else{
					console.log("User Error")
					error = {...error, password: 'Password incorrect'};
				}
			})
			.catch(err => console.error(err.message))
		}else{
			console.log("password Error")
			error = {...error, email: 'User does not exist'};
		}
		if(error) return res.status(405).send({error});
	})
	.catch((error) => res.status(405).send({error: error}))

})

app.get("/generatePDF", (req, res) => {
	var student = {
		student_id: 'H00456321',
		student_major: 'IT Multimedia',
		student_year: 2022,
		student_name: 'Amr',
		password_id: 37,
		password_strength: 'fair',
		password_complexity: '[0-9-0-0-0-9-false]',
		password_duration: '32 seconds'
	}

	res.render('report-template.ejs', {student: student})

})

app.get("/generatePDF/:password_id", (req, res) => {
	const pdfID = makeID(8);
	select_password_information(req.params.password_id)
	.then((response) => {
		console.log(response[0])
		ejs.renderFile('./views/report-template.ejs', {student: response[0]}, (err, data) => {
			if (err) {
				  res.send({error1: err});
			} else {
				let options = {
					"height": "11.25in",
					"width": "8.5in",
					"header": {
						"height": "20mm"
					},
					"footer": {
						"height": "20mm",
					},
				};
				pdf.create(data, options).toFile(`pdf/${pdfID}.pdf`, function (err, data) {
					if (err) {
						res.send({error2: err});
					} else {
						var data = fs.readFileSync(`pdf/${pdfID}.pdf`);
						res.contentType("application/pdf");
						res.send(data);
					}
				});
			}
		});
	})
	.catch((error) => res.status(405).send({error: error}))

})

app.post("/insertPassword", (req, res) => {
	update_student_attempts(req.body.student_id)
	.then((response) => {
		if(response.affectedRows === 1){
			insertPassword(req.body.strength, req.body.student_id, req.body.complexity, req.body.duration).
			then((response) => {
				console.log(response.insertId)
				if(response.affectedRows === 1){
					console.log("Password Added")
 					console.log ({'password_id': response.insertId})
 					res.send({'password_id': response.insertId})
				}else{
					res.status(405).send({error: "System Error"})
				}
			})
			.catch(() => res.status(405).send({error: "System Error"}))
		}else{
			res.status(405).send({error: "System Error"})
		}
	})
	.catch(() => res.status(405).send({error: "System Error"}))

});

app.post("/insertStudent", async (req, res) => {
	var error;
	if(!req.body.id){
		error = {...error, id: 'Student ID not found'};
	}
	if(req.body.id.length != 9){
		error = {...error, id: 'Student ID should be in this format H00123456'};
	}
	if(req.body.id.substring(0, 3).toUpperCase() != 'H00'){
		error = {...error, id: 'Student ID should begin with H00'};
	}
	if(!req.body.major){
		error = {...error, major: 'Student Major not found'};
	}
	if(!req.body.name){
		error = {...error, name: 'Student Name not found'};
	}
	if(!req.body.year){
		error = {...error, year: 'Student Year not found'};
	}

	if(error) return res.status(405).send({error});

	isStudentValid(req.body.id)
	.then((response) => {
		if(response.length === 0){
			insertStudent(req.body.id, req.body.name, req.body.year, req.body.major)
			.then((response) => {
				if(response.affectedRows === 1){
					res.send({message: "successful"});
				}else{
					res.status(405).send({error: "System Error"})
				}
			})
			.catch(() => res.status(405).send({error: "System Error"}))
		}
		else res.send({message: "Successful"})
	})
	.catch(() => res.status(405).send({error: "System Error"}))
});

// Listen on pc port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});