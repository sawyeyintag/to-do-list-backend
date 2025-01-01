import { Document } from "mongoose";

export interface IToDo extends Document {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IToDoInput extends Document {
  title: string;
  description: string;
  completed: boolean;
}
