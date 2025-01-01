import express from "express";
import { ToDoController } from "../controllers/ToDoController";

export const toDoRoutes = express.Router();

toDoRoutes.get("", ToDoController.getAllToDo);
toDoRoutes.post("", ToDoController.createToDo);
toDoRoutes.get("/:id", ToDoController.getToDoById);
toDoRoutes.patch("/:id", ToDoController.updateToDo);
toDoRoutes.delete("/:id", ToDoController.deleteToDo);
