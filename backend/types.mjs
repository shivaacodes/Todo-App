import { z } from "zod";

const createTodo = z.object({
  title: z.string().nonempty("Title is required."),
  description: z.string().nonempty("Description is required."),
});

const updateTodo = z.object({
  id: z.string().uuid("Invalid ID format."),
});

export { createTodo, updateTodo };
