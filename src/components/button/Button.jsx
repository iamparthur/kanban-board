import React from 'react';

const Button = ({value, onClick, className, id}) => {
    return <input className={`button ${className}`} 
        type='button'
        id={id}
        value={value}
        onClick={onClick}
    />
}

export default Button;