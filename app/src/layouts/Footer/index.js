import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './style.css';

function Footer() {
  return (
		<div className="footer">
      <FacebookIcon className='socialMedia'/>
      <InstagramIcon className='socialMedia'/>
      <TwitterIcon className='socialMedia'/>
		</div>
  );
}

export default Footer;