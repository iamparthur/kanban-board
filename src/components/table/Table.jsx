import React from 'react';
import TableElement from '../tableElement/TableElement';

class Table extends React.Component {
    render() {
        const {tasks, title, deleteTableElement} = this.props;

        return <div className="table">
            {tasks.map((task, index)=> {
                if (task.title === title) {
                    return <TableElement
                        taskName={task.name}
                        key={index}
                        id={index}
                        deleteTableElement={deleteTableElement}
                    />
                } else return null;
            })}
        </div>
    }
}

export default Table;