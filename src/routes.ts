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

// Rota de boas-vindas
routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: 'Olá mundo!' });
});

// Rotas para tarefas
routes.get("/tasks", getTasks);          // Obtém todas as tarefas
routes.post("/tasks", saveTask);         // Cria uma nova tarefa
routes.get("/tasks/:id", getTask);       // Obtém uma tarefa específica por ID
routes.put("/tasks/:id", updateTask);    // Atualiza uma tarefa específica por ID
routes.delete("/tasks/:id", deleteTask); // Exclui uma tarefa específica por ID
routes.patch("/tasks/:id", finishedTask);// Marca uma tarefa como concluída por ID

export default routes;
