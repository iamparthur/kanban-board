import React from 'react';

const Dropdown = ({onClick, className, idDropdown,}) => {
    return <div className={className}
            onClick={onClick}
            id={idDropdown} > 
    </div>
}
 
export default Dropdown;