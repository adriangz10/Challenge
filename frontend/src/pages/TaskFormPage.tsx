import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import type { Task } from '../types/index.ts';

interface TaskFormPageProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>, id?: string) => Promise<void>;
  taskToEdit: Task | null;
  onCancelEdit: () => void;
}

const TaskFormPage: React.FC<TaskFormPageProps> = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const navigate = useNavigate();

  const handleFormSubmitAndNavigate = async (taskData: Omit<Task, 'id' | 'createdAt'>, id?: string) => {
    await onSubmit(taskData, id);
    navigate('/');
  };

  const handleCancelAndNavigate = () => {
    onCancelEdit();
    navigate('/');
  };

  return (
    <div className="container">
      <h1>{taskToEdit ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h1>
      <TaskForm
        onSubmit={handleFormSubmitAndNavigate}
        taskToEdit={taskToEdit}
        onCancelEdit={handleCancelAndNavigate}
      />
    </div>
  );
};

export default TaskFormPage;