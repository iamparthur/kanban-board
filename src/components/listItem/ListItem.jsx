import React from 'react';

const ListItem = ({taskName, onClick, id, classNameListItem, date}) => {
    return <div className="ListItem">
            <p id={id} className={classNameListItem} onClick={onClick}>{taskName}</p>
            {date && <p className ="date_string">task create : {date}</p>}     
    </div>
}

export default ListItem;