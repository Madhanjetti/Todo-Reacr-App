import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editedTodo, setEditedTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      if (editedTodo !== null) {
        // Update an existing todo
        const updatedTodos = todos.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, text: newTodo } : todo
        );
        setTodos(updatedTodos);
        setEditedTodo(null);
      } else {
        // Add a new todo
        const newTodoItem = {
          id: new Date().getTime(),
          text: newTodo,
        };
        setTodos([...todos, newTodoItem]);
      }

      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodo(todoToEdit.text);
      setEditedTodo(todoToEdit);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <div className="App-content">
      <div className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task"
          />
          <button onClick={addTodo}>
            {editedTodo !== null ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {todo.text}
              <div className="todo-buttons">
                <button onClick={() => editTodo(todo.id)}>Update</button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default App;