import React, {useState} from 'react';
import './style.css';

function Button(props) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = () => {
    setHover(false);
  }

  var style = {
    backgroundColor: 'transparent',
    color: props.color ? props.color: 'black',
    fontSize: '16px',
    fontWeight: props.fontWeight ? props.fontWeight : 'normal',
    padding: '1rem',
    margin: '0 1rem 0 1rem',
    marginTop: '0',
    marginBottom: '0',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    borderBottom: hover ? 'solid 1px black' : 'none',
    textTransform: 'capitalize'
  }

  style.borderBottom = props.submit ? 'solid 1px black': hover ? 'solid 1px black' : 'none';
  return (
    <button
      className='Button'
      style={style}
      onMouseEnter = {handleMouseEnter}
      onMouseLeave = {handleMouseLeave}
    >
      {props.text}
    </button>
  );
}

export default Button;