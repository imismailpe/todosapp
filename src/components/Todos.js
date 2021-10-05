import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoBox from './TodoBox';
import { setTodos } from '../store/actions/actions';

const ToDos = (props) => {
    const statuses = ['Abandoned', 'Completed', 'InProgress'];
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.dataR.toJS());
    const [todosData, settodosData] = useState(dataStore.todosList);
    const [filterInput, setfilterInput] = useState('');
    const [newItemText, setnewItemText] = useState('');
    const [dragItem, setDragItem] = useState({id: '', text: ''});
    const onFilterInputChange = (e) => {
        setfilterInput(e.target.value);
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
        setnewItemText('');
    }
    const handleDragStart = (event, id) => {
        const item = dataStore.todosList.find(item => item.id === id);
        setDragItem(item);
    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }
    const handleOnDrop = (event, status) => {
        let data = [...dataStore.todosList];
        let item = data.find(item => item.id === dragItem.id);
        item.status=status;
        dispatch(setTodos([...data]));
        setDragItem({id: '', text: ''});
    }
    useEffect(() => {
        if(filterInput){
            const keyword = filterInput.toLowerCase();
            settodosData(dataStore.todosList.filter(item => item.text.toLowerCase().includes(keyword)));    
        }
        else{
            settodosData(dataStore.todosList);
        }
    }, [filterInput]);
    return (
        <div>
            <div className='inputsContainer'>
            <input onChange={e => setnewItemText(e.target.value)} value={newItemText} type="text" name="newtodo" className="newTodoItem" id="newTodoItemText" placeholder="What is pending to do?" minLength="3" required />
            <input onClick={addNewTodo} type="button" name="addtoto" className="addTodoItem" id="addTodoItem" value="Add" />
            <input onChange={onFilterInputChange} value={filterInput} type="text" name="searchtodo" className="searchtodo" id="searchtodo" placeholder="Filter a task" minLength="3" required />
            </div>
            <hr />
            <ul className="mainList" id="todoList">Today's Tasks:
                {
                    dataStore.todosList.filter(item => item.status === '').map(item => <div onDragStart={e => handleDragStart(e,item.id)} className='todoItemNew' key={item.id} draggable='true'><div className=''>{item.text}</div></div>)
                }
            </ul>
            <hr />
            <div className='todoboxContainer'>
                {
                    statuses.map(status => {
                        const data = filterInput ? todosData.filter(item => item.status === status) : dataStore.todosList.filter(item => item.status === status);
                        return <TodoBox onDrop={handleOnDrop} onDragOver={handleDragOver} onDragStart={handleDragStart} key={status} status={status} data={data} />
                    })
                }
            </div>
        </div>
    )
}
export default ToDos;