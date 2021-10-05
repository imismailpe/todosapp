import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoBox from './TodoBox';
import { setTodos } from '../store/actions/actions';

const ToDos = (props) => {
    const statuses = ['Abandoned', 'Completed', 'InProgress'];
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.dataR.toJS());
    const [todosData, settodosData] = useState(dataStore.todosList);
    const [newItemText, setnewItemText] = useState('');
    const onFilterInputChange = (e) => {
        console.log(e.target.value)
        if(e.target.value){
            const keyword = e.target.value.toLowerCase();
            settodosData(dataStore.todosList.filter(item => item.text.toLowerCase().includes(keyword)));
        }
        else{
            settodosData(dataStore.todosList);
        }
    }
    const addNewTodo = () => {
        const newItem = {
            text: newItemText,
            id: dataStore.todosList.length + 1,
            status: ''
        }
        let data = [...dataStore.todosList];
        data.push(newItem);
        dispatch(setTodos(data));
    }
    useEffect(()=>{
        settodosData(dataStore.todosList)
    },[dataStore.todosList.length]);
    console.log("store is ", dataStore)
    return (
        <div>
            <h4>To Do</h4>
            <input onChange={e => setnewItemText(e.target.value)} value={newItemText} type="text" name="newtodo" className="newTodoItem" id="newTodoItemText" placeholder="What is pending to do?" minLength="3" required />
            <input onClick={addNewTodo} type="button" name="addtoto" className="addTodoItem" id="addTodoItem" value="Add" />
            <input onChange={onFilterInputChange} type="text" name="searchtodo" className="searchtodo" id="searchtodo" placeholder="Filter a task" minLength="3" required />
            <hr />
            <ol className="mainList" id="todoList">Today's Tasks:
            {
                todosData.filter(item => item.status === '').map(item => <div className='todoItemContainer' key={item.id} draggable='true'><div className='todoItem'>{item.text}</div></div>)
            }
            </ol>
            <hr />
            <div className='todoboxContainer'>
            {
                statuses.map(status => {
                    const data = todosData.filter(item => item.status === status);
                    return <TodoBox key={status} status={status} data={data} />
                })
            }
            </div>
        </div>
    )
}
export default ToDos;