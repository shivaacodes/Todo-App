import { useState } from "react";

export function CreateTodo(props) {
  // State for forming inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      style={{
        display: "flex", //css flexbox
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
        height: "100vh", // Full viewport height
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 20,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)} // Update state
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            width: "200px",
          }}
          type="text"
          placeholder="Title"
          value={title}
        />
        <input
          id="desc"
          onChange={(e) => setDescription(e.target.value)} // Update state
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            width: "200px",
          }}
          type="text"
          placeholder="Description"
          value={description}
        />
        <button
          style={{
            padding: "10px 20px",
            margin: 10,
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            // Send data through POST request
            //axios library makes this easier
            fetch("http://localhost:3000/todo", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(async (res) => {
                if (!res.ok) {
                  throw new Error("Failed to add todo");
                }
                const json = await res.json();
                alert("Todo Added!");
                setTitle("");
                setDescription("");
              })
              .catch((error) => {
                alert(`Error: ${error.message}`);
              });
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Add a Todo
        </button>
      </div>
    </div>
  );
}
