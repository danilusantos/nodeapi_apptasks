import { Router, Request, Response } from "express";

import {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  deleteTask,
  finishedTask
} from "./controller/TaskController";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: 'Olá mundo!' });
});

routes.get("/tasks", getTasks);
routes.post("/tasks", saveTask);
routes.get("/tasks/:id", getTask);
routes.put("/tasks/:id", updateTask);
routes.delete("/tasks/:id", deleteTask);
routes.patch("/tasks/:id", finishedTask);

export default routes;
