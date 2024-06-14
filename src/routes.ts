import { Router, request, response, Request, Response } from 'express';

import { getTasks } from './controller/TaskController';
import { saveTask } from './controller/TaskController';
import { getTask } from './controller/TaskController';
import { updateTask } from './controller/TaskController';
import { deleteTask } from './controller/TaskController';
import { finishedTask } from './controller/TaskController';

const routes = Router();

routes.get('/home', (request: Request, response: Response) => {
  return response.redirect('/tasks');
});

routes.get('/tasks', getTasks);
routes.post('/tasks', saveTask);
routes.get('/tasks/:id', getTask);
routes.put('/tasks/:id', updateTask);
routes.delete('/tasks/:id', deleteTask);
routes.patch('/tasks/:id', finishedTask);

export default routes;
