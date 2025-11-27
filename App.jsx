import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  // Props example
  const UserCard = ({ name, age }) => {
    return (
      <div className="col-md-4">
        <div className="p-3 border rounded bg-light mb-3">
          <h4>{name}</h4>
          <p>Age: {age}</p>
        </div>
      </div>
    );
  };

  // List example
  const users = [
    { id: 1, name: "Aman", age: 22 },
    { id: 2, name: "Priya", age: 19 },
    { id: 3, name: "Rahul", age: 25 },
  ];

  // Conditional Rendering
  const isLoggedIn = true;

  // Form Handling
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entered: " + input);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="p-3 bg-primary text-white rounded mb-4">
        <h2>React Single-File Practice App</h2>
      </div>

      {/* Conditional Rendering */}
      <h4>Conditional Rendering</h4>
      <p>{isLoggedIn ? "User Logged In" : "Login Required"}</p>

      {/* List Rendering with Props */}
      <h4 className="mt-4">User List (Props + List Rendering)</h4>
      <div className="row">
        {users.map((u) => (
          <UserCard key={u.id} name={u.name} age={u.age} />
        ))}
      </div>

      {/* Form Handling */}
      <h4 className="mt-4">Form Example</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
