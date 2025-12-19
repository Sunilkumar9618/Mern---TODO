import { useEffect, useState } from "react";

// Todo Component
export default function Todo() {

  // ---------- State declarations ----------
  const [title, setTitle] = useState("");                 // New todo title
  const [description, setDescription] = useState("");     // New todo description
  const [todos, setTodos] = useState([]);                 // List of todos
  const [error, setError] = useState("");                 // Error message
  const [message, setMessage] = useState("");             // Success message
  const [editId, setEditId] = useState(-1);               // Currently editing todo ID

  // ---------- Edit state ----------
  const [edittitle, setEditTitle] = useState("");         // Edit title
  const [editdescription, setEditDescription] = useState(""); // Edit description

  // Backend API base URL
  const apiUrl = "http://localhost:8000";

  // ---------- Create Todo ----------
  const handleSubmit = () => {
    setError("");

    // Validate inputs
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            // Add todo locally after success
            setTodos([...todos, { title, description }]);
            setTitle("");
            setDescription("");
            setMessage("Item Added Successfully!!");

            // Clear success message
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch(() => {
          setError("Unable to create Todo Item!!");
        });
    }
  };

  // ---------- Fetch Todos on page load ----------
  useEffect(() => {
    getItems();
  }, []);

  // ---------- Get all todos ----------
  const getItems = () => {
    fetch(apiUrl + "/todos").then((res) =>
      res.json().then((res) => setTodos(res))
    );
  };

  // ---------- Enable edit mode ----------
  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  // ---------- Update Todo ----------
  const handleUpdate = () => {
    setError("");

    // Validate edit inputs
    if (edittitle.trim() !== "" && editdescription.trim() !== "") {
      fetch(apiUrl + "/todos/" + editId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: edittitle,
          description: editdescription,
        }),
      })
        .then((res) => {
          if (res.ok) {

            // Update todo in local state
            const updatedTodos = todos.map((item) => {
              if (item._id == editId) {
                item.title = edittitle;
                item.description = editdescription;
              }
              return item;
            });

            setTodos(updatedTodos);
            setEditTitle("");
            setEditDescription("");
            setEditId(-1);
            setMessage("Item updated Successfully!!");

            // Clear success message
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch(() => {
          setError("Unable to create Todo Item!!");
        });
    }
  };

  // ---------- Cancel edit ----------
  const handleEditCancel = () => {
    setEditId(-1);
  };

  // ---------- Delete Todo ----------
  const handleDelete = (id) => {
    if (window.confirm("Do you want to Delete ?")) {
      fetch(apiUrl + "/todos/" + id, { method: "DELETE" })
        .then(() => {
          // Remove deleted todo from state
          const updatedTodos = todos.filter((item) => item._id !== id);
          setTodos(updatedTodos);
        });
    }
  };

  // ---------- UI ----------
  return (
    <div>
      {/* Header */}
      <div className="row p-3 bg-success text-light">
        <h1>Todo project with MERN Stack</h1>
      </div>

      {/* Add Todo */}
      <div className="row p-3">
        <h3>ADD ITEM</h3>
        {message && <p className="text-success">{message}</p>}

        <div className="form-group d-flex gap-2">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          />
          <button className="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}
      </div>

      {/* Todo List */}
      <div className="row mt-3">
        <h3>Tasks</h3>
        <ul className="list-group">
          {todos.map((item) => (
            <li
              key={item._id}
              className="list-group-item bg-info d-flex justify-content-between align-items-center my-3"
            >
              <div className="d-flex flex-column me-2">
                {editId == -1 || editId !== item._id ? (
                  <>
                    <span className="fw-bold">{item.title}</span>
                    <span>{item.description}</span>
                  </>
                ) : (
                  <>
                    <input
                      placeholder="Title"
                      onChange={(e) => setEditTitle(e.target.value)}
                      value={edittitle}
                      className="form-control"
                      type="text"
                    />
                    <input
                      placeholder="Description"
                      onChange={(e) => setEditDescription(e.target.value)}
                      value={editdescription}
                      className="form-control"
                      type="text"
                    />
                  </>
                )}
              </div>

              <div className="d-flex gap-2">
                {editId == -1 || editId != item._id ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                ) : (
                  <button className="btn btn-warning" onClick={handleUpdate}>
                    Update
                  </button>
                )}

                {editId == -1 ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
