import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetchAndUpdateTasks();
  }, []);

  const fetchAndUpdateTasks = () => {
    fetchTasksFromServer().then((data) => {
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('Data from the server is not an array:', data);
      }
    });
  };

  const fetchTasksFromServer = async () => {
    try {
		  const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr');
		  return await response.json();
	  } catch (error) {
		  console.error('Error fetching tasks:', error);
	  }
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = taskInput;
      updateTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTasks(updatedTasks);
  };

  const updateTasks = (updatedTasks) => {
    updateTasksOnServer(updatedTasks).then(() => {
      setTasks(updatedTasks);
    });
  };

  const updateTasksOnServer = async (updatedTasks) => {
    try {
		  const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
			  method: 'PUT',
			  body: JSON.stringify(updatedTasks),
			  headers: {
				  'Content-Type': 'application/json',
			  },
		  });
		  return await response.json();
	  } catch (error) {
		  console.error('Error updating tasks on the server:', error);
	  }
  };

  return (
    <div id="todo-list">
      <h1>Things to do</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && addTask()}
      />
      <ul id="task-list">
        {tasks.length === 0 ? (
          <p id="no-tasks">No tasks, add a task</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <span className="delete-task" onClick={() => deleteTask(index)}>
                ❌
              </span>
            </li>
          ))
        )}
      </ul>
      {tasks.length > 0 && (
        <div className="item-count">
          {tasks.length === 1
            ? `${tasks.length} item left`
            : `${tasks.length} items left`}
        </div>
      )}
    </div>
  );
};

export default TodoList;
