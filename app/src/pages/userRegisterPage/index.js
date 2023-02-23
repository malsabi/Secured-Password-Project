import React , {useRef, useState} from 'react';
import './style.css';
import Button from '../../components/Button';
import Label from '../../components/Label';
import { Link } from 'react-router-dom';

function UserRegisterPage() {
	const [inputs, setInputs] = useState({});
	const [isShown, setIsShown] = useState(false);

	// Variable Errors
	const [nameError, setNameError] = useState("Hello World");
	const [idError, setIdError] = useState(null);
	const [yearError, setYearError] = useState(null);
	const [majorError, setMajorError] = useState(null);

	// Variables input fields
	const name = useRef(null);
	const id = useRef(null);
	const major = useRef(null);
	const year = useRef(null);

	// Display Error Field
	const nameField = useRef(null);
	const idField = useRef(null);
	const majorField = useRef(null);
	const yearField = useRef(null);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs(values => ({...values, [name]: value}))
	}

	async function handleResponse() {
		const response = await fetch("http://localhost:3001/", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputs)
		});

		if(response.ok) return setIsShown(current => !current)

		const data = await response.json();

		if(data['error']['id']) {
			id.current.classList.add('is-invalid');
			idField.current.classList.add('invalid-feedback');
			setIdError(data['error']['id'])
		}
		else{
			id.current.classList.remove('is-invalid');
			idField.current.classList.remove('invalid-feedback');
			setIdError(false)
		}

		if(data['error']['name']){
			name.current.classList.add('is-invalid')
			nameField.current.classList.add('invalid-feedback')
			setNameError(data['error']['name'])
		}else{
			name.current.classList.remove('is-invalid')
			nameField.current.classList.remove('invalid-feedback')
			setNameError(false)
		}

		if(data['error']['year']){
			year.current.classList.add('is-invalid')
			yearField.current.classList.add('invalid-feedback')
			setYearError(data['error']['year'])
		}else{
			year.current.classList.remove('is-invalid')
			yearField.current.classList.remove('invalid-feedback')
			setYearError(false)
		}

		if(data['error']['major']){
			major.current.classList.add('is-invalid')
			majorField.current.classList.add('invalid-feedback')
			setMajorError(data['error']['major'])
		}else{
			major.current.classList.remove('is-invalid')
			majorField.current.classList.remove('invalid-feedback')
			setMajorError(false)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		handleResponse();
	}

  	return (
		  <div className='container'>
			{!isShown &&
			(
				<div className='register'>
					<div className='d-flex justify-content-center'>
						<Label text='Welcome to Secure Password! Please Register' ></Label>
					</div>
					<form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
						<div className="col-6 mb-4">
							<label htmlFor="name" className="form-label">Student Name:</label>
							<input type="text" ref={name} className="form-control" name="name" placeholder='Enter your name' onChange={handleChange}/>
							<div ref={nameField} className="valid-feedback">
							{nameError}
							</div>
						</div>
						<div className="col-6 mb-4">
							<label htmlFor="id" className="form-label">Student ID:</label>
							<input type="text" ref={id} className="form-control" name="id" placeholder='Enter your HCT ID' onChange={handleChange}/>
							<div ref={idField} className="valid-feedback">
							{idError}
							</div>
						</div>
						<div className="col-6 mb-4">
							<label htmlFor="major" className="form-label">Student Major:</label>
							<input type="text" ref={major} className="form-control" name="major" placeholder='Enter your Major' onChange={handleChange}/>
							<div ref={majorField} className="valid-feedback">
							{majorError}
							</div>
						</div>
						<div className="col-6 mb-4">
							<label htmlFor="year" className="form-label">Student Year:</label>
							<input type="text" ref={year} className="form-control" name="year" placeholder='Enter your Year' onChange={handleChange}/>
							<div ref={yearField} className="valid-feedback">
							{yearError}
							</div>
						</div>
						<div className='row d-flex justify-content-center'>
							<div className='col-4 d-flex justify-content-center'>
								<Button text="Register" submit="true" className="w-25"></Button>
							</div>
						</div>
					</form>
				</div>
			)}

			{isShown && (
				<div className='registerConfirmed'>
					<div className='d-flex justify-content-center'>
						<Label text='Registration Confirmed'></Label>
					</div>
					<p className='text-center fs-4'>
						Your registration process is completed. Now you can use the website to test the strength of your desired password.
					</p>
					<div className='row d-flex justify-content-center'>
						<div className='col-6 d-flex justify-content-center'>
							<Link to='/testPassword'><Button text="TEST THE PASSWORD NOW" submit="true" color="#2e5582" fontWeight="bold" className="w-25"></Button></Link>
						</div>
					</div>
				</div>
			)}
		</div>
  	)
}

export default UserRegisterPage;