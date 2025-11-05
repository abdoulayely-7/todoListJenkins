import { v4 as uuidv4 } from 'uuid';
let tasks = [];

export const getTasks = (req, res) => res.json(tasks);

export const createTask = (req, res) => {
  const task = { id: uuidv4(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if(index !== -1){
    tasks[index] = { id, ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not found');
  }
};

export const deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).send();
};
