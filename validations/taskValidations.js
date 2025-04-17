const { body, param ,query } = require('express-validator');

const getAllTasksValidation = [
    query('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be either "pending", "in_progress", or "completed"'),
    query('dueDate').optional().isISO8601({ strict: true }).withMessage('dueDate must be a valid date in ISO format (YYYY-MM-DD)'),
];
  
const createTaskValidation = [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').isString().optional(),
    body('dueDate').isISO8601({ strict: true }).optional().withMessage('dueDate must be a valid date in ISO format (YYYY-MM-DD)'),,
    body('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Status must be either "pending", "in_progress", or "completed"'),
];

const updateTaskValidation = [
    param('id').isInt().withMessage('Task ID must be an integer'),
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').isString().optional(),
    body('dueDate').isISO8601({ strict: true }).optional().withMessage('dueDate must be a valid date in ISO format (YYYY-MM-DD)'),,
    body('status').isIn(['pending', 'in_progress', 'completed']).optional(),
];

const getTaskByIdValidation = [
    param('id').isInt().withMessage('Task ID must be an integer'),
];

const deleteTaskValidation = [
    param('id').isInt().withMessage('Task ID must be an integer'),
];

module.exports = {
    getAllTasksValidation,
    createTaskValidation,
    updateTaskValidation,
    getTaskByIdValidation,
    deleteTaskValidation,
};
