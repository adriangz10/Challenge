import React, { useState, useEffect } from 'react';
import type { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>, id?: string) => void;
  taskToEdit?: Task | null;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, completed: taskToEdit?.completed || false }, taskToEdit?.id);
    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    onCancelEdit();
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{ taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea' }</h2>
      <label htmlFor="title">Título:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Descripción:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button type="submit">{ taskToEdit ? 'Actualizar Tarea' : 'Agregar Tarea' }</button>
      {taskToEdit && (
        <button type="button" onClick={handleCancel} style={{ backgroundColor: '#6c757d', marginTop: '5px' }}>
          Cancelar Edición
        </button>
      )}
    </form>
  );
};

export default TaskForm;