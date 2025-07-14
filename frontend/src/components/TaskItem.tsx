import React from 'react';
import type { Task } from '../types/index.ts';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const createdAt = new Date(task.createdAt).toLocaleString();

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Creada: {createdAt}</small>
      <small>Estado: {task.completed ? 'Completada' : 'Pendiente'}</small>
      <div className="task-actions">
        <button className="toggle-complete" onClick={() => onToggleComplete(task.id, !task.completed)}>
          {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </button>
        <button className="edit" onClick={() => onEdit(task)}>Editar</button>
        <button className="delete" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  );
};

export default TaskItem;