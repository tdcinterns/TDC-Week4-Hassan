const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTasks = async (req, res) => {
    try {
      const { page = 1, perPage = 10 } = req.query;
      const parsedPage = parseInt(page, 10);
      const parsedPerPage = parseInt(perPage, 10);
      if (isNaN(parsedPage) || parsedPage < 1 || isNaN(parsedPerPage) || parsedPerPage < 1) {
        return res.status(400).json({ message: 'Invalid page or perPage parameters' });
      }
      const skip = (parsedPage - 1) * parsedPerPage;

      const tasks = await prisma.task.findMany({
        skip,
        take: parsedPerPage,
      });
  
      res.json(tasks);
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

const getTasksByID = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the task by ID
      const task = await prisma.task.findUnique({
        where: { id: parseInt(id, 10) },
      });
  
      if (!task) {
        // If no task is found, return a 404 status with an appropriate message
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Return the task if found
      res.json(task);
    } catch (error) {
      console.error('Get task by ID error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const createTask = async (req, res) => {
    try {
      const { title , description} = req.body;
  
      // Create a new task
      const createdTask = await prisma.task.create({
        data: { title , description},
      });
  
      res.status(201).json(createdTask);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      // Update the task by ID
      const updatedTask = await prisma.task.update({
        where: { id: parseInt(id, 10) },
        data: { title, description },
      });
  
      if (!updatedTask) {
        // If no task is updated, return a 404 status with an appropriate message
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Return the updated task
      res.json(updatedTask);
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await prisma.task.delete({
        where: { id: parseInt(id, 10) },
      });
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(404).json({ message: 'ID not found' });
    }
  };
  

module.exports = {
    getAllTasks,
    getTasksByID,
    createTask,
    updateTask,
    deleteTask,
};
