import React from 'react';
import './style.css';
import StrengthMeter from '../../components/StrengthMeter';
import Label from '../../components/Label';
import Cookies from 'universal-cookie';
function TestPasswordPage() {
	const cookies = new Cookies();
	const studentID = cookies.get('studentID');
	console.log(studentID)
	// cookies.remove('studentID', { path: '/' });

	if(!studentID){
		window.location.replace('/userRegister');
	}


  	return (
		<div className='w-100 d-flex flex-column justify-content-center '>
			<div className='d-flex justify-content-center'>
				<Label text='Check Your Password Strength'></Label>
			</div>
			<div className='row'>
				<div className='col-12 d-flex justify-content-center align-items-center'>
					<StrengthMeter studentID = {studentID}></StrengthMeter>

				</div>
			</div>
		</div>
  	)
}

export default TestPasswordPage;