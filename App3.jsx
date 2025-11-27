import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // ------------------ GET API ------------------
  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ------------------ POST API ------------------
  const addUser = async () => {
    const res = await axios.post(API_URL, form);
    setUsers([res.data, ...users]);
    setForm({ name: "", email: "" });
  };

  // ------------------ PUT API ------------------
  const updateUser = async () => {
    const res = await axios.put(`${API_URL}/${editingId}`, form);
    setUsers(users.map((u) => (u.id === editingId ? res.data : u)));
    setEditingId(null);
    setForm({ name: "", email: "" });
  };

  // ------------------ DELETE API ------------------
  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    editingId ? updateUser() : addUser();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">React REST API CRUD (Axios)</h2>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <h4>{editingId ? "Update User" : "Add User"}</h4>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", email: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* USERS LIST */}
      <h4 className="mt-4">Users</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{user.name}</strong>
              <br />
              <small>{user.email}</small>
            </div>

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  setEditingId(user.id);
                  setForm({ name: user.name, email: user.email });
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
