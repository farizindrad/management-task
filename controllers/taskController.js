const Task = require("../models/Task");
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');

// const getAllTasks = async (req, res) => {
//     const tasks = await Task.findAll();
//     res.json(tasks);
// };

// const getTaskById = async (req, res) => {
//     const task = await Task.findByPk(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Task not found' });
//     res.json(task);
// };

// const createTask = async (req, res) => {
//     const { title, description, dueDate, status } = req.body;
//     try {
//         const task = await Task.create({ title, description, dueDate, status });
//         res.status(201).json(task);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };
  
// const updateTask = async (req, res) => {
//     const { title, description, dueDate, status } = req.body;
//     const task = await Task.findByPk(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     try {
//         await task.update({ title, description, dueDate, status });
//         res.json(task);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };
  
// const deleteTask = async (req, res) => {
//     const task = await Task.findByPk(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     await task.destroy();
//     res.json({ message: 'Task deleted' });
// };

const getAllTasks = async (req, res) => {
    try {
        const { status, dueDate } = req.query;
    
        let query = 'SELECT * FROM tasks';
        const conditions = [];
        const replacements = {};
    
        if (status) {
            conditions.push('status = :status');
            replacements.status = status;
        }
    
        if (dueDate) {
            conditions.push('DATE(due_date) = :dueDate');
            replacements.dueDate = dueDate;
        }
    
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
    
        console.log(query)

        const tasks = await sequelize.query(query, {
            replacements,
            type: QueryTypes.SELECT,
        });

        console.log(tasks)
    
        if (tasks.length === 0) {
            return res.status(200).json({ message: 'No tasks found', data: [] });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const [task] = await sequelize.query(
            'SELECT * FROM tasks WHERE id = :id',
            {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT,
            }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    try {
        const [result] = await sequelize.query(
            `
            INSERT INTO tasks (title, description, due_date, status, created_at, updated_at)
            VALUES (:title, :description, :dueDate, :status, NOW(), NOW())
            `,
            {
            replacements: { title, description, dueDate, status },
            type: QueryTypes.INSERT,
            }
        );
    
        const [newTask] = await sequelize.query('SELECT * FROM tasks WHERE id = :id', {
            replacements: { id: result },
            type: QueryTypes.SELECT,
        });
    
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  
const updateTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    try {
        const [task] = await sequelize.query('SELECT * FROM tasks WHERE id = :id', {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT,
        });
    
        if (!task) return res.status(404).json({ message: 'Task not found' });
    
        await sequelize.query(
            `
            UPDATE tasks
            SET title = :title, description = :description, due_date = :dueDate, status = :status, updated_at = NOW()
            WHERE id = :id
            `,
            {
            replacements: { title, description, dueDate, status, id: req.params.id },
            type: QueryTypes.UPDATE,
            }
        );
    
        const [updatedTask] = await sequelize.query('SELECT * FROM tasks WHERE id = :id', {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT,
        });
    
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  
const deleteTask = async (req, res) => {
    try {
        const [task] = await sequelize.query('SELECT * FROM tasks WHERE id = :id', {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT,
        });
  
        if (!task) return res.status(404).json({ message: 'Task not found' });
  
        await sequelize.query('DELETE FROM tasks WHERE id = :id', {
            replacements: { id: req.params.id },
            type: QueryTypes.DELETE,
        });
  
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
