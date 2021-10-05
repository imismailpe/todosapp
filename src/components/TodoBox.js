import React from 'react';

const TodoBox = (props) => {
    return (
        <div className='todosBox'>
            <div className='todosBoxTitle'>{props.status}</div>
            <div className='todosBoxBody'>
                {
                    props.data.map(item => <div className='todoItemContainer'><div className='todoItem'>{item.text}</div></div>)
                }
            </div>
        </div>
    )
}
export default TodoBox;