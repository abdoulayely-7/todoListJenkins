import { v4 as uuidv4 } from 'uuid';
let tasks = [
  { id: uuidv4(), name: 'Apprendre Node.js', description: 'Étudier les bases de Node.js', done: false },
  { id: uuidv4(), name: 'Créer une API REST', description: 'Développer une API RESTful pour la gestion des tâches', done: true },
  { id: uuidv4(), name: 'Tester l\'application', description: 'Écrire et exécuter des tests unitaires', done: false },
  { id: uuidv4(), name: 'Déployer sur Docker', description: 'Containeriser l\'application avec Docker', done: false }
];

export const getTasks = (req, res) => res.json(tasks);

export const createTask = (req, res) => {
  const task = { id: uuidv4(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { id, ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not trouver');
  }
};

export const deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).send();
};
