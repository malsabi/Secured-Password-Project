import React from 'react'
import logo from '../../assets/images/logo_lowRes.PNG';
import Button from '../../components/Button';
import './style.css';
import { Link } from 'react-router-dom';


function Header(){
    return (
		<div className='header row'>
			<div className='col-3 d-flex justify-content-center'>
				<img src={logo} className="logo" alt="logo" />
			</div>
			<div className='col-9'>
			<div className='topNav'>
				<Link to="/userRegister"><Button text="User Register" textTransform="uppercase"></Button></Link>
				<Link to="/adminLogin"><Button text="Administrator Log In" textTransform="uppercase" borderBottom="none"></Button></Link>
			</div>
			<div className='Pages'>
				<Link to="/"><Button text="Home" textTransform="uppercase" borderBottom="none"></Button></Link>
				<Link to="/testPassword"><Button text="Test the Password" textTransform="uppercase" borderBottom="none"></Button></Link>
				<Link to="/passwordSuggestions"><Button text="Password Suggestions" textTransform="uppercase" borderBottom="none"></Button></Link>
				<Link to="/contactUs"><Button text="Contact Us" textTransform="uppercase" borderBottom="none"></Button></Link>
			</div>
			</div>
		</div>
    )
}

export default Header;
