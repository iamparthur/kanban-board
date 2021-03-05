import React from 'react';
 
class Input extends React.Component {
    render () {
        const {value, style, onChange, className, onKeyPress} = this.props;

        return <input
            type="text"
            value={value}
            style={style}
            onChange={onChange}
            className={`input ${className}`}
            onKeyPress={onKeyPress}
            autoFocus={true}
        />
    }
}

export default Input;