import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { Task } from './types';
import TaskList from './components/TaskList';
import TaskFormPage from '../src/pages/TaskFormPage';
import './index.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Task[] = await response.json();
      setTasks(data.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })));
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('No se pudieron cargar las tareas. Asegúrate de que el backend esté funcionando.');
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFormSubmit = async (taskData: Omit<Task, 'id' | 'createdAt'>, id?: string) => {
    setError(null);
    try {
      let response: Response;
      if (id) {
        response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...taskData, completed: taskToEdit?.completed }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setTaskToEdit(null);
      await fetchTasks();
      return Promise.resolve();
    } catch (err: any) {
      console.error('Error al guardar tarea:', err);
      setError(`Error al guardar la tarea: ${err.message}`);
      return Promise.reject(err);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      fetchTasks();
    } catch (err: any) {
      console.error('Error al eliminar tarea:', err);
      setError(`Error al eliminar la tarea: ${err.message}`);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    setError(null);
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, completed: completed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      fetchTasks();
    } catch (err: any) {
      console.error('Error al cambiar estado:', err);
      setError(`Error al cambiar el estado de la tarea: ${err.message}`);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    navigate('/add-task');
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Lista de Tareas</h1>
              <nav>
                <Link to="/add-task">
                  <button>Agregar Nueva Tarea</button>
                </Link>
              </nav>
              <h2>Mis Tareas</h2>
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            </>
          }
        />
        <Route
          path="/add-task"
          element={
            <TaskFormPage
              onSubmit={handleFormSubmit}
              taskToEdit={taskToEdit}
              onCancelEdit={handleCancelEdit}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;