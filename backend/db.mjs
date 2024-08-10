import mongoose from "mongoose";

// Establish a connection to the MongoDB Atlas cluster
mongoose.connect(
  "mongodb+srv://shivasajay:Shivam007@cluster0.gscagly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const Todo = mongoose.model("Todo", todoSchema);

// Export the model for use in other parts of the application
export default Todo;
