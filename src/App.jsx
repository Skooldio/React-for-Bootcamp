import React, { useState, useEffect } from 'react';

const taskList = ({ tasks, removeTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li>{task.title} <button onClick={() => removeTask(task.id)}>Remove</button></li>
      ))}
    </ul>
  );
};

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    console.log('Tasks updated');
  }, []);

  useEffect(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    setTasks(data);
  }, []);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <h1>Task Manager</h1>
    <p>Total tasks: {taskCount}</p>
    <TaskForm addTask={addTask} />
    <taskList tasks={tasks} removeTask={removeTask} />
  );
};

export default App;