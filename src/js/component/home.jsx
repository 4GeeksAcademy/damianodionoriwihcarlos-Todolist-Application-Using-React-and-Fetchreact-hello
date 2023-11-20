import React, { useState, useEffect } from 'react';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const url = "https://playground.4geeks.com/apis/fake/todos/user/damianodionori"

  useEffect(() => {
		//fetch to create the user
		fetch(url, {
			method: "POST", // post to create
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([])
		})
			//if the resp.ok is true, means the user was created (didn't exist, else, we fetch the info from our user)
			.then(resp => resp.ok ? resp.json() : fetchData())
			.then(data => setTasks(data))
			.catch(error => error.msg == "The user exists" ? fetchData() : console.log(error))
	}, [])

  const fetchData = () => {
		//fetch info from user
		fetch(url) //this would be a GET, but since it's the default behavior, no need to specify
			.then(resp => resp.json()) // we parse the response to JSON format (JS cannot work with TEXT, and we receive text because everything on the internet is text)
			.then(data => setTasks(data)) //once parsed, we receive the data, this data we store it on the state to use it
			.catch(error => console.log(error)) //if errors, it'll be catched here
	}
  
  const handleSubmit = e => {
		e.preventDefault();
		setTasks([...tasks, { label: newTask, done: false }]) //we store the new task on the todoList state with the same format we are we are working (obj)
	}

  const addTask = () => {
    if (taskInput.trim() !== '') { //checking if the result is not an empty string
      setTasks([...tasks, { label: taskInput, done: false }]); //creates a new array with all existing tasks plus the new one
      setTaskInput(''); //prepares the input field for the user to add another task
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // checks the index of each task and keeps only those where the index is not equal to the index parameter
  };

  console.log(tasks);

  return (
    <div id='todo-list'>
      <h1>Things to do</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskInput} // bind the input field's value to the taskInput state variable
        onChange={(e) => setTaskInput(e.target.value)} // updates the taskInput state using setTaskInput
        onKeyUp={(e) => e.key === 'Enter' && addTask()} //if the Enter key was pressed the addTask function is called
      />
      <ul id="task-list">
        {tasks && tasks.length === 0 ? (
          <p id="no-tasks">No tasks, add a task</p>
        ) : (
          tasks && tasks.map((task, index) => (
            <li key={index}>
              <span>{task.label}</span>
              <span className="delete-task" onClick={() => deleteTask(index)}>
                ❌
              </span>
            </li>
          ))
        )}
      </ul>
      {tasks && tasks.length > 0 && ( //if the array length is not greater than 0 nothing is rendered
        <div className="item-count">
          {tasks.length === 1 ? `1 item left` : `${tasks.length} items left`}
        </div>// if the array length is equal to 1 the first case is rendered, otherwise the second one using a ternary
      )}
    </div>
  );
};