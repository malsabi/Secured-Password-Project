import React from 'react';
import './style.css';
import StrengthMeter from '../../components/StrengthMeter';
import Label from '../../components/Label';

function TestPasswordPage() {
  	return (
		<div className='w-100 d-flex flex-column justify-content-center '>
			<div className='d-flex justify-content-center'>
				<Label text='Check Your Password Strength'></Label>
			</div>
			<div className='row'>
				<div className='col-12 d-flex justify-content-center align-items-center'>
					<StrengthMeter></StrengthMeter>

				</div>
					<div style={{fontSize: '12px'}} className='w-100 alert alert-light text-center text-uppercase fs-6'>Entries are 100% secure and not stored in any way or shared with anyone</div>
			</div>
		</div>
  	)
}

export default TestPasswordPage;