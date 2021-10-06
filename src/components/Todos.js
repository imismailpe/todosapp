/**Handles the todo tasks display and drag and drop */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoBox from './TodoBox';
import { setTodos } from '../store/actions/actions';

const ToDos = () => {
    //list of statuses for tasks
    const statuses = ['Pending', 'Abandoned', 'Completed', 'InProgress'];
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.dataR.toJS());
    const [todosData, settodosData] = useState(dataStore.todosList);
    const [filterInput, setfilterInput] = useState('');
    const [newItemText, setnewItemText] = useState('');
    const [dragItem, setDragItem] = useState({ id: '', text: '' });
    //handle user input for filter
    const handleFilterInputChange = (e) => {
        setfilterInput(e.target.value);
    }
    //add a new task to store
    const addNewTodo = () => {
        //add new task only if there is some text content
        if (newItemText) {
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
    }
    //identify the task being dragged
    const handleDragStart = (event, id) => {
        const item = dataStore.todosList.find(item => item.id === id);
        setDragItem(item);
    }
    //prevent default action on dragover event
    const handleDragOver = (event) => {
        event.preventDefault();
    }
    //update status of dropped task
    const handleOnDrop = (event, status) => {
        let data = [...dataStore.todosList];
        let item = data.find(item => item.id === dragItem.id);
        item.status = status;
        //update the store
        dispatch(setTodos([...data]));
        //clear the task set as being dragged
        setDragItem({ id: '', text: '' });
    }
    //handle enter key press on new task addition
    const handleSubmit = (event) => {
        //prevent default action on form submit
        event.preventDefault();
        //add new task only if there is some text content
        if (event.target.newtodo.value) {
            addNewTodo();
        }
    }
    //sets background color for lists based on status
    const getBGColor = (status) => {
        switch(status){
            case 'Abandoned':
                return 'redBox';
            case 'Completed':
                return 'greenBox';
            case 'InProgress':
                return 'yellowBox';
            default:
                return 'whiteBox'; 
        }
    }
    //if there is a filter text, display the filtered tasks. otherwise display full list of tasks
    useEffect(() => {
        if (filterInput) {
            const keyword = filterInput.toLowerCase();
            settodosData(dataStore.todosList.filter(item => item.text.toLowerCase().includes(keyword)));
        }
        else {
            settodosData(dataStore.todosList);
        }
    }, [filterInput]);
    return (
        <div>
            <form className='inputsContainer' onSubmit={handleSubmit}>
                <input onChange={e => setnewItemText(e.target.value)} value={newItemText} type="text" name="newtodo" className="newTodoItem" id="newTodoItemText" placeholder="What is pending to do?" />
                <input onClick={addNewTodo} type="submit" name="addtoto" className="addTodoItem" id="addTodoItem" value="Add" />
                <input onChange={handleFilterInputChange} value={filterInput} type="text" name="searchtodo" className="searchtodo" id="searchtodo" placeholder="Filter a task" />
            </form>
            <hr />
            <ol className="mainList" id="todoList" onDrop={e => handleOnDrop(e, '')} onDragOver={handleDragOver}>Today's Tasks:
                {
                    dataStore.todosList.filter(item => item.status === '').map(item => <div onDragStart={e => handleDragStart(e, item.id)} className='todoItemNew' key={item.id} draggable='true'><li>{item.text}</li></div>)
                }
            </ol>
            <hr />
            <div className='todoboxContainer'>
                {
                    statuses.map(status => {
                        const data = filterInput ? todosData.filter(item => item.status === status) : dataStore.todosList.filter(item => item.status === status);
                        return <TodoBox onDrop={handleOnDrop} onDragOver={handleDragOver} onDragStart={handleDragStart} key={status} status={status} data={data} bgColor={getBGColor(status)} />
                    })
                }
            </div>
        </div>
    )
}
export default ToDos;