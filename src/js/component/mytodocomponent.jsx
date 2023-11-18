import React, { useState, useEffect } from 'react';

const MyTodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const endpoint = 'https://playground.4geeks.com/apis/fake/todos/user/damianodionori';
  
    const handleAddToDo = async (newTodo) => {
      await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify([...todos, {label: newTodo, done: false}]),
      });
      setTodos([...todos, {label: newTodo, done: false}]);
    };
  
    useEffect(() => {
      async function fetchTodos() {
        const response = await fetch(endpoint);
        const todoJson = await response.json();
        setTodos(todoJson);
      }
      fetchTodos();
    }, []);
  
    return (
      <div className='App'>
        {todos.map(todo => todo.label)}
      </div>
    );
  };
  
  export { MyTodoComponent };