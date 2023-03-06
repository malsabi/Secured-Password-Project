import React, {useState} from "react";
import zxcvbnAsync from "zxcvbn-async";
// import Button from "../Button";
import { Button } from "react-bootstrap";
import "./style.css";
import Cookies from 'universal-cookie';

const StrengthMeter = (props) => {
	const cookies = new Cookies();

	const studentID = props.studentID;
  	const [password, setPassword] = useState('');
  	const [complexity, setComplexity] = useState('');
  	const [crackDuration, setCrackDuration] = useState(null);
	const [passwordStrength, setPasswordStrength] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	const [passwordID, setPasswordID] = useState(null);

	const handleChange = (event) => {
		if(!event.target.value){
			setPassword('');
			setCrackDuration(null);
			setPasswordStrength([]);
			return
		}
		setPassword(event.target.value);
		zxcvbnAsync.load()
		.then((zxcvbn) => {
			var results = zxcvbn(event.target.value);
			setCrackDuration(results.crack_times_display.offline_slow_hashing_1e4_per_second)
		});
		setPasswordStrength(passwordChecker(event.target.value));
		setComplexity(returnComplexity(event.target.value));
	};

	function isStringDuplicated(str) {
		str = str.toLowerCase(); // convert input string to lowercase
		const len = str.length;
		if (len % 2 !== 0) {
		  return false; // if string length is odd, it can't be duplicated
		}
		const halfLen = len / 2;
		const firstHalf = str.substring(0, halfLen);
		const secondHalf = str.substring(halfLen, len);
		return firstHalf === secondHalf;
	}

	function returnComplexity (password){
		var uppercase = (password.match(/[A-Z]/g) || []).length;
		var lowercase = (password.match(/[a-z]/g) || []).length;
		var numbers = (password.match(/[0-9]/g) || []).length;
		var symbols = (password.match(/[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/g) || []).length;
		var spaces = (password.match(/ /g) || []).length;
		var length = password.length;
		var isDuplicate = isStringDuplicated(password);

		return `[${uppercase}-${lowercase}-${numbers}-${symbols}-${spaces}-${length}-${isDuplicate}]`;
	}

	const passwordChecker = (password) => {

		if(password.length >= 15 && /[A-Za-z0-9][!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(password)){
			return {
				strength: 4,
				val: "strong",
				backgroundColor: '#01a917'
			}
		}
		if(password.length >= 10 && /[A-Za-z0-9][!@#$%^&*_+\-=;':"|,.<>/?]/.test(password)){
			return {
				strength: 3,
				val: "good",
				backgroundColor: '#0b75ed'
			}
		}
		if(password.length >= 8 && /[A-Za-z0-9]/.test(password)){
			return {
				strength: 2,
				val: "fair",
				backgroundColor: '#ebbd04'
			}
		}
		if(password.length <= 7 && /[A-Za-z]/.test(password)){
			return {
				strength: 1,
				val: "weak",
				backgroundColor: '#e20b07'
			}
		}

		return {
			strength: 0,
			val: "",
			backgroundColor: ''
        }
	}

	async function handleResponse() {
		const response = await fetch("http://localhost:3001/insertPassword", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				strength: passwordStrength.val,
				student_id: studentID,
				complexity: complexity,
				duration: crackDuration
			})
		});

		const data = await response.json();

		if(response.ok) {
			setPasswordID(data.password_id);

			return setSubmitted(current => !current)
		}

	}

	const handleSubmit = (event) => {
		event.preventDefault();

		handleResponse();
	}

	async function generatePDF(){
		// cookies.remove('studentID', { path: '/' });

		// const response = await fetch(`http://localhost:3001/generatePDF/${passwordID}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Accept': 'application/pdf',
		// 		'Content-Type': 'application/pdf'
		// 	}
		// });

		fetch(`http://localhost:3001/generatePDF/${passwordID}`)
		.then(response => response.blob())
		.then(blob => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'your-filename.pdf';
			document.body.appendChild(a);
			a.click();
			a.remove();
		});
	}

  	return (
		<div className='w-100 d-flex flex-column justify-content-center'>
			{submitted &&
			(<div className="row">
				<div className='col-12 d-flex text-center justify-content-center align-items-center mt-3'>
					<Button type="submit" className="btn btn-success btn-lg text-dark" onClick={()=>generatePDF()}>Generate PDF</Button>
				</div>
			</div>)}
			{!submitted &&
			(<div className='row'>
				<form onSubmit={handleSubmit}>
					<div className='row mb-5 d-flex flex-column justify-content-center'>
						<div className='col-12 d-flex justify-content-center align-items-center'>
							<input
								className=" w-50 text-center"
								style={{
									height:'5rem',
									fontSize:'20px',
									backgroundColor: `${passwordStrength.backgroundColor ? passwordStrength.backgroundColor: ''}`
								}}
								value={password}
								type="password"
								name="passwordChecker"
								placeholder='Enter Your Password'
								onChange={handleChange}
							/>
						</div>

						<div className='col-12 d-flex justify-content-center align-items-center mt-3'>
							<div className="pwd-label">
								{password && (
									<div>
										<p
											className="text-uppercase fw-bold"
											style={{
												color: `${passwordStrength.backgroundColor}`
											}}
										>
											{passwordStrength.val}
										</p>
									</div>
								)}
							</div>
						</div>
						<div className='col-12 d-flex text-center justify-content-center align-items-center mt-3'>
							{crackDuration &&
								`It would take a computer roughly ${crackDuration} to crack your password`
							}
						</div>
						<div className='col-12 d-flex text-center justify-content-center align-items-center mt-3'>
							{password &&
								<Button type="submit" className="btn btn-danger btn-lg text-dark" >NEXT</Button>
							}
						</div>
						<div className='col-12 d-flex text-center justify-content-center align-items-center mt-3'>
							<div style={{fontSize: '12px'}} className='w-100 alert alert-light text-center text-uppercase fs-6'>Entries are 100% secure and not stored in any way or shared with anyone</div>

						</div>
					</div>
				</form>
			</div>)}
		</div>
  	);
};
export default StrengthMeter;