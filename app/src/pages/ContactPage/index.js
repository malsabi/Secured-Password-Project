import React from 'react';
import Label from '../../components/Label';
import './style.css';

function ContactPage() {
	return (
		<div className='w-100'>
			<div className='d-flex justify-content-center'>
				<Label text="Contact Us"></Label>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-4 text-center'>&bull;&emsp;Khulood Yousuf Al Nuaimi</div>
				<div className='col-4 text-center'>H00418272@hct.ac.ae</div>
				<div className='col-4 text-center'>02 - 2062345</div>
			</div>
			<div className='row'>
				<div className='col-4 text-center'>&bull;&emsp;Maitha Hamad Al Suwaidi</div>
				<div className='col-4 text-center'>H00417167@hct.ac.ae</div>
				<div className='col-4 text-center'>02 - 2061567</div>
			</div>
			<div className='row'>
				<div className='col-4 text-center'>&bull;&emsp;Amnah Abdulla Al Ameeri</div>
				<div className='col-4 text-center'>H00417181@hct.ac.ae</div>
				<div className='col-4 text-center'>02 - 2069876</div>
			</div>
		</div>
	)
}

export default ContactPage;