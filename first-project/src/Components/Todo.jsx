import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css'
import { TodoItems } from './TodoItems';

export const Todo = () => {
  
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  let count = 0;

  
  const add = () => {
    setTodos([...todos,{no:count++, text:inputRef.current.value,display:""}]);
    inputRef.current.value = "";
    console.log('update count in add',count);
    localStorage.setItem("todo_count",count);
  }

  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    console.log('update count: ',count);
    count = localStorage.getItem("todo_count");
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      console.log(todos);
      localStorage.setItem("todos",JSON.stringify(todos));
    },100);
  },[todos])
  

  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
          <input ref={inputRef}  type="text" placeholder='Add Your Task' className='todo-input'/>
          <div onClick={()=>{add()}} className="todo-add-btn">ADD</div>
        </div>
        <div className="todo-list">
          {todos.map((item,index)=>{
            return <TodoItems key={index} no={item.no} display={item.display} text={item.text}/>
          })}
        </div>
    </div>
  )
}

