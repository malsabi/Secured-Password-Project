import React from 'react';
import './style.css';
import passwordTable from '../../assets/images/passwordTable.PNG';
import Label from '../../components/Label';

function PasswordSuggestionsPage() {
	return (
		<div>
			<div className='d-flex justify-content-center'>
				<Label text='4 Types of Password'></Label>
			</div>
			<div className='row'>
				<div className='col-6'>
					<div className="row">
						<div className="col-6"><strong>Strong Password:</strong></div>
						<div className="col-6">Khulood is@2001</div>
					</div>
					<div className="row">
						<div className="col-6"><strong>Good Password:</strong></div>
						<div className="col-6">Fatima@2005_</div>
					</div>
					<div className="row">
						<div className="col-6"><strong>Fair Password:</strong></div>
						<div className="col-6">Aisha17</div>
					</div>
					<div className="row">
						<div className="col-6"><strong>Weak Password:</strong></div>
						<div className="col-6">QWERTY</div>
					</div>
					<div className='row mt-4 d-flex justify-content-center'>
						<p className='fs-4 text-danger text-center'>&bull;&emsp;Ensure to follow the Strong Password Policy</p>
					</div>
				</div>
				<div className='col-6'>
					<img src={passwordTable} style={{width:'100%'}}alt="logo" />
				</div>
			</div>
		</div>
	)
}

export default PasswordSuggestionsPage;