/*Displays List of tasks in any given status*/
import React from 'react';

const TodoBox = (props) => {
    return (
        <div className={`todosBox ${props.bgColor}`} onDragOver={props.onDragOver} onDrop={e => props.onDrop(e, props.status)} >
            <div className='todosBoxTitle'>{props.status}</div>
            <div className='todosBoxBody'>
                {
                    props.data.map(item => <div onDragStart={e => props.onDragStart(e,item.id)} className='todoItem todoItemContainer_' key={item.id} draggable='true'><li>{item.text}</li></div>)
                }
            </div>
        </div>
    )
}
export default TodoBox;