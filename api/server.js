// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
require("dotenv").config();

const express = require("express");
const app = express();
var mysql = require('mysql');

// allow request from localhost to happen
app.use((req,res, next)=>{
	res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
	res.setHeader('Access-Control-Allow-Headers',"*");
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

// Open Database connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "secure_password"
});

con.connect(function(err) {
	if (err) return console.log(err);
	console.log("Connected!");
});

// Middleware
app.use(express.json()); // parse json bodies in the request object

app.post("/insertPassword", (req, res) => {
	console.log(req.body)
	res.send(req.body)

	// if(error) return res.send(405, {error});

	// const sql = `INSERT INTO \`student\` (\`student_name\`, \`student_id\`, \`student_year\`, \`student_major\`) VALUES ('${req.body.name}', '${req.body.id}', '${req.body.year}', '${req.body.major}')`;
	// con.query(sql, function (err, result) {
	// 	if (err) console.log(err);
	// 	res.send(result);
	// });
});

app.post("/insertStudent", (req, res) => {
	console.log(req.body)
	var error;
	if(!req.body.id){
		error = {...error, id: 'Student ID not found'};
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

	if(error) return res.send(405, {error});

	const sql = `INSERT INTO \`student\` (\`student_name\`, \`student_id\`, \`student_year\`, \`student_major\`) VALUES ('${req.body.name}', '${req.body.id}', '${req.body.year}', '${req.body.major}')`;
	con.query(sql, function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});

// Listen on pc port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});