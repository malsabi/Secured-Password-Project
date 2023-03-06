import React, {useState, useRef} from 'react';
import './style.css';
import Label from '../../components/Label';
import { Button } from "react-bootstrap";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


function AdminLoginPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
	// const [isShown, setIsShown] = useState(false);

	// Variable Errors
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	// Variables input fields
	const email = useRef(null);
	const password = useRef(null);

	// Display Error Field
	const emailField = useRef(null);
	const passwordField = useRef(null);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({...values, [name]: value}))
	}

	async function handleResponse() {
		const response = await fetch("http://localhost:3001/login", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputs)
		});
    console.log("submitted")
		const data = await response.json();

		console.log(data)
		if(response.ok) {
      navigate("/adminDashboard")

      const cookies = new Cookies();
			cookies.set('studentID', inputs.id, {path: "/"});

			return true;
		}

		if(data['error']['email']) {
      console.log("Email error")
			email.current.classList.add('is-invalid');
			emailField.current.classList.add('invalid-feedback');
			setEmailError(data['error']['email'])
		}
		else{
      console.log("Email no error")

			email.current.classList.remove('is-invalid');
			emailField.current.classList.remove('invalid-feedback');
			setEmailError(false)
		}

		if(data['error']['password']){
      console.log("Password error")

			password.current.classList.add('is-invalid')
			passwordField.current.classList.add('invalid-feedback')
			setPasswordError(data['error']['password'])
		}else{
      console.log("Password no error")

			password.current.classList.remove('is-invalid')
			passwordField.current.classList.remove('invalid-feedback')
			setPasswordError(false)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		handleResponse();
	}
  return (
    <div className='w-75 d-flex justify-content-center align-items-center flex-column'>
      <div>
        <Label text="Admin Login"/>

      </div>
      <form className="w-100 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="email" ref={email} className="form-control" name="email" id="floatingInput" onChange={handleChange} placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Email address</label>
          <div ref={emailField} className="valid-feedback">
            {emailError}
          </div>
        </div>

        <div className="form-floating mb-3">
          <input type="password" ref={password} className="form-control" name="password" id="floatingPassword" onChange={handleChange} placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
          <div ref={passwordField} className="valid-feedback">
            {passwordError}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default AdminLoginPage;