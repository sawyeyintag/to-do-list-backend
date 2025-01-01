import { Request, Response } from "express";
import ToDo from "../models/ToDo";

export const ToDoController = {
  getAllToDo: async (req: Request, res: Response) => {
    try {
      const toDos = await ToDo.find().sort({ createdAt: -1 });
      res.send(toDos);
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  },
  getToDoById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const toDo = await ToDo.findById(id);
      res.send(toDo);
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  },
  createToDo: async (req: Request, res: Response) => {
    try {
      const { title, description, completed } = req.body;
      const newToDo = await ToDo.create({ title, description, completed });
      res.status(201).send(newToDo);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },
  updateToDo: (req: Request, res: Response) => {
    res.send({ message: "Update ToDo", id: req.params.id });
  },
  deleteToDo: (req: Request, res: Response) => {
    res.send({ message: "Delete ToDo", id: req.params.id });
  },
};
