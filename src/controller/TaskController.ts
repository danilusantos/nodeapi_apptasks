import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Task } from '../entity/Task';

export const getTasks = async (request: Request, response: Response) => {
  const task = await AppDataSource.getRepository(Task).find();
  return response.json(task);
};

export const saveTask = async (request: Request, response: Response) => {
  const task = await AppDataSource.getRepository(Task).save(request.body);
  return response.json(task);
};

export const getTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const task = await AppDataSource.getRepository(Task).findOneBy({ id });
  return response.json(task);
};

export const updateTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const task = await AppDataSource.getRepository(Task).update(id, request.body);

  if (task.affected == 1) {
    const taskUpdated = await AppDataSource.getRepository(Task).findOneBy({
      id,
    });
    return response.json(taskUpdated);
  } else {
    return response.status(404).json({ message: 'Tarefa não encontrada!' });
  }
};

export const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Task).delete(id);

  if (task.affected == 1) {
    return response
      .status(200)
      .json({ message: 'Tarefa excluída com sucesso!' });
  } else {
    return response.status(404).json({ message: 'Tarefa não encontrada!' });
  }
};

export const finishedTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const task = await AppDataSource.getRepository(Task).update(id, {
    finished: true,
  });

  if (task.affected == 1) {
    const taskFinished = await AppDataSource.getRepository(Task).findOneBy({
      id,
    });
    return response.json(taskFinished);
  } else {
    return response.status(404).json({ message: 'Tarefa não encontrada!' });
  }
};
