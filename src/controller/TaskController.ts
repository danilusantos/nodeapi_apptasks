import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { validate } from 'class-validator';

// Obtém todas as tarefas
export const getTasks = async (request: Request, response: Response) => {
  try {
    const tasks = await AppDataSource.getRepository(Task).find();
    return response.json(tasks);
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao obter tarefas.', error: error.message });
  }
};

// Salva uma nova tarefa
export const saveTask = async (request: Request, response: Response) => {
  try {
    const task = new Task();
    Object.assign(task, request.body);

    const errors = await validate(task);
    if (errors.length > 0) {
      return response.status(400).json({ message: 'Dados inválidos.', errors });
    }

    const savedTask = await AppDataSource.getRepository(Task).save(task);
    return response.status(201).json(savedTask);
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao salvar tarefa.', error: error.message });
  }
};

// Obtém uma tarefa específica por ID
export const getTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  try {
    const task = await AppDataSource.getRepository(Task).findOneBy({ id });
    if (task) {
      return response.json(task);
    } else {
      return response.status(404).json({ message: 'Tarefa não encontrada!' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao obter tarefa.', error: error.message });
  }
};

// Atualiza uma tarefa específica por ID
export const updateTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  try {
    const taskToUpdate = await AppDataSource.getRepository(Task).findOneBy({ id });
    if (!taskToUpdate) {
      return response.status(404).json({ message: 'Tarefa não encontrada!' });
    }

    Object.assign(taskToUpdate, request.body);

    const errors = await validate(taskToUpdate);
    if (errors.length > 0) {
      return response.status(400).json({ message: 'Dados inválidos.', errors });
    }

    const updatedTask = await AppDataSource.getRepository(Task).save(taskToUpdate);
    return response.json(updatedTask);
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao atualizar tarefa.', error: error.message });
  }
};

// Exclui uma tarefa específica por ID
export const deleteTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  try {
    const task = await AppDataSource.getRepository(Task).delete(id);

    if (task.affected === 1) {
      return response.status(200).json({ message: 'Tarefa excluída com sucesso!' });
    } else {
      return response.status(404).json({ message: 'Tarefa não encontrada!' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao excluir tarefa.', error: error.message });
  }
};

// Marca uma tarefa como concluída por ID
export const finishedTask = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  try {
    const task = await AppDataSource.getRepository(Task).update(id, {
      status: 'completed',
    });

    if (task.affected === 1) {
      const taskFinished = await AppDataSource.getRepository(Task).findOneBy({ id });
      return response.json(taskFinished);
    } else {
      return response.status(404).json({ message: 'Tarefa não encontrada!' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Erro ao marcar tarefa como concluída.', error: error.message });
  }
};
