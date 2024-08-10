import express from "express";
import cors from "cors";
import { createTodo, updateTodo } from "./types.mjs";
import todo from "./db.mjs";

const app = express();
app.use(express.json());
app.use(cors()); // In production, consider configuring CORS

app.post("/todo", async function (req, res) {
  const createPayload = req.body;

  // Safely parse the input payload
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    return res.status(400).json({ msg: "You sent the wrong inputs" });
  }

  try {
    // Create a new todo item
    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
    });
    res.status(201).json({ msg: "Todo created" });
  } catch (error) {
    res.status(500).json({ msg: "Error creating todo", error: error.message });
  }
});

app.get("/todos", async function (req, res) {
  try {
    const todos = await todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching todos", error: error.message });
  }
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;

  // Safely parse the input payload
  const parsedPayload = updateTodo.safeParse(updatePayload); // Corrected

  if (!parsedPayload.success) {
    return res.status(400).json({ msg: "Wrong inputs" });
  }

  try {
    // Update the todo item to be marked as completed
    await todo.updateOne(
      { _id: req.body.id }, // Find by ID
      { completed: true } // Set completed to true
    );
    res.status(200).json({ msg: "Todo marked as completed" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating todo", error: error.message });
  }
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
