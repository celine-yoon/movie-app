import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();

    if (todo === "") {
      return;
    }
    setTodos((current) => [todo, ...current]);
    setTodo("");
  };

  return (
    <div>
      <h1>To Do List ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder=" Write your to do..."
        />
        <button type="submit">Add To Do</button>
        <hr />
        <ul>
          {todos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
