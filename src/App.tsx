import React from 'react';
import './App.css';
import { data } from './data';
import { TaskList } from './components/task-list/task-list';



function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>ToDo list</h1>
      </header>
      <TaskList initialTasks={data} />
      <footer className="footer">
        <p>&copy; 2025 Alyssa's App</p>
      </footer>
    </div>
  );
}

export default App;
