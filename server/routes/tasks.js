const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Mock database to store tasks for demo purposes
const mockTasks = new Map();
let taskIdCounter = 1;

// Get all tasks for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    // Get all tasks for this user from mock database
    const userTasks = [];
    for (const [taskId, task] of mockTasks.entries()) {
      if (task.user_id === req.user.id) {
        userTasks.push({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: task.due_date,
          created_at: task.created_at,
          user_id: task.user_id
        });
      }
    }

    // Sort by created_at (newest first)
    userTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(userTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific task
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  const { title, description, due_date, status } = req.body;

  try {
    // Create new task in mock database
    const newTask = {
      id: taskIdCounter++,
      user_id: req.user.id,
      title: title,
      description: description,
      due_date: due_date || null,
      status: status || 'todo',
      created_at: new Date().toISOString()
    };

    mockTasks.set(newTask.id.toString(), newTask);

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { title, description, due_date, status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, due_date || null, status, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = mockTasks.get(taskId);

    if (!task || task.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    mockTasks.delete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
