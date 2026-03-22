import { useState } from "react";

function App() {
  const [task, setTask] = useState ("");
  const [todos, setTodos] = useState ([]);

  function addTask () {
    setTodos ([...todos, { id: Date.now(), text: task }]);
    setTask("");
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h1>My To-Do List</h1>
      <input type="text" placeholder="Add a task..." value={task} onChange={(e) => setTask(e.target.value)}/>
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;