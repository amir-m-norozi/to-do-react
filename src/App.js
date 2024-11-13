import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditedText(task.text);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedText('');
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, text: editedText } : task
    ));
    setEditingTask(null);
    setEditedText('');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do List</h1>
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button className="add-task-btn" onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks-container">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            {editingTask && editingTask.id === task.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="edit-input"
                />
                <button className="save-btn" onClick={saveEdit}>Save</button>
                <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div className="task-text">
                <span>{task.text}</span>
                <button className="edit-btn" onClick={() => startEditing(task)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;