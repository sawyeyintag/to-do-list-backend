import { Request, Response } from "express";
import mongoose from "mongoose";
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
  getToDoById: async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Not a valid id" });
      }
      const toDo = await ToDo.findById(id);
      if (!toDo) {
        return res.status(404).send({ message: "ToDo not found" });
      }
      res.send(toDo);
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error" });
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
