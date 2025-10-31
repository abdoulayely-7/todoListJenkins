class Task {
  constructor({ id, name, description, done = false }) {
    this.id = id;                   // ID unique
    this.name = name;               // Nom de la tâche
    this.description = description; // Description optionnelle
    this.done = done;               // Statut : true si terminée
  }
}

export default Task;
