import React from 'react';
import './style.css';
import Label from '../../components/Label';


function HomePage(){
    return (
        <div>
            <Label text='Password Strength Checker'></Label>
            <div>
                <p style={{width:'100%', maxWidth: '500px'}}>
                    With Secure Password, it's easy to check your password strength and get feedback on your phone, computer, tablet, and more.<br></br><br></br>
                    You can also discover how long it takes for a computer to crack your password and how to improve it and make it harder to crack.
                </p>
            </div>
        </div>

    )
}

export default HomePage;
