import React, {useState} from "react";
import zxcvbnAsync from "zxcvbn-async";
// import Button from "../Button";
import { Button } from "react-bootstrap";
import "./style.css";
const StrengthMeter = () => {
  	const [password, setPassword] = useState('');
  	const [crackDuration, setCrackDuration] = useState(null);
	const [passwordStrength, setPasswordStrength] = useState([]);

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
	};

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
		console.log(passwordStrength.val)
		const response = await fetch("http://localhost:3001/insertPassword", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: password,
				strength: passwordStrength.val,
				creator: 2
			})
		});

		console.log(response)

		// if(response.ok) return setIsShown(current => !current)

		const data = await response.json();

		console.log(data)

	}

	const handleSubmit = (event) => {
		event.preventDefault();

		handleResponse();
	}

  	return (
		<div className='w-100 d-flex flex-column justify-content-center'>
			<div className='row'>
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

					</div>

				</form>
			</div>
		</div>
  	);
};
export default StrengthMeter;