const express = require('express');
const cors = require('cors');
const app = express();
const taskController = require('./controllers/taskController');
const sequelize = require('./config/database');
const { createTaskValidation, updateTaskValidation, getTaskByIdValidation, deleteTaskValidation, getAllTasksValidation } = require('./validations/taskValidations');
const validateRequest = require('./validations/validationMiddleware');

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL Database!'))
  .catch(err => console.error('Database connection failed:', err));

app.get('/tasks', getAllTasksValidation, validateRequest, taskController.getAllTasks);
app.get('/tasks/:id', getTaskByIdValidation, validateRequest, taskController.getTaskById);
app.post('/tasks', createTaskValidation, validateRequest, taskController.createTask);
app.put('/tasks/:id', updateTaskValidation, validateRequest, taskController.updateTask);
app.delete('/tasks/:id', deleteTaskValidation, validateRequest, taskController.deleteTask);

const PORT = process.env.PORT || 3555;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
