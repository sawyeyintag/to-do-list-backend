import mongoose from "mongoose";
import { IToDo } from "../types/ToDo";

const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
  {
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
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IToDo>("ToDo", ToDoSchema);
