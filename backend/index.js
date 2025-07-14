require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

let tasks = [];

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'El título de la tarea es requerido.' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        description: description || '',
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    if (!title) {
        return res.status(400).json({ message: 'El título de la tarea es requerido.' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed
    };

    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});