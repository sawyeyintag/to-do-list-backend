import express from "express";
import { body } from "express-validator";

import { ToDoController } from "../controllers/ToDoController";
import { handleToDoErrorMessage } from "../middlewares/handleToDoErrorMessage";

export const toDoRoutes = express.Router();

toDoRoutes.get("", ToDoController.getAllToDo);
toDoRoutes.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("completed").notEmpty().isBoolean(),
  ],
  handleToDoErrorMessage,
  ToDoController.createToDo
);

toDoRoutes.get("/:id", ToDoController.getToDoById);
toDoRoutes.patch("/:id", ToDoController.updateToDo);
toDoRoutes.delete("/:id", ToDoController.deleteToDo);
