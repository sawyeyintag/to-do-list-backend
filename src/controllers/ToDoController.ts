import { Request, Response } from "express";
import mongoose from "mongoose";
import ToDo from "../models/ToDo";
import { IToDo, IToDoInput } from "../types/ToDo";

function handleIdValidation(id: string, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "Not a valid id" });
  }
}

function handleToDoNotFound(toDo: IToDo | null, res: Response) {
  if (!toDo) {
    res.status(404).send({ message: "ToDo not found" });
  }
}

export const ToDoController = {
  getAllToDo: async (req: Request, res: Response) => {
    try {
      const toDos: IToDo[] = await ToDo.find().sort({ createdAt: -1 });
      res.send(toDos);
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  },
  getToDoById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      handleIdValidation(id, res);
      const toDo: IToDo | null = await ToDo.findById(id);
      handleToDoNotFound(toDo, res);
      res.send(toDo);
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  createToDo: async (req: Request, res: Response) => {
    try {
      const { title, description, completed }: IToDoInput = req.body;
      const newToDo = await ToDo.create({ title, description, completed });
      res.status(201).send(newToDo);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  },
  updateToDo: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      handleIdValidation(id, res);
      const toDo: IToDo | null = await ToDo.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      handleToDoNotFound(toDo, res);
      res.send(toDo);
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  deleteToDo: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      handleIdValidation(id, res);
      const toDo: IToDo | null = await ToDo.findByIdAndDelete(id);
      handleToDoNotFound(toDo, res);
      res.send(toDo);
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
