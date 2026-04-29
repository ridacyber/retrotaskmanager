import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
  updated_at: string;
}

const TaskDetail: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  
  const { user, logout } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const fetchTask = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTask(response.data);
      setEditedTask(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch task');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedTask) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/tasks/${id}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTask(response.data);
      setEditedTask(response.data);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="terminal-text text-2xl">LOADING...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-retro-brown">Task not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-4 border-retro-dark bg-retro-brown p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-retro-cream terminal-text">
            [RETROTASK]
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="retro-button text-sm">
              BACK TO DASHBOARD
            </Link>
            <span className="text-retro-cream">Welcome, {user?.name}!</span>
            <button onClick={logout} className="retro-button text-sm">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="retro-card">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold terminal-text">[TASK DETAIL]</h1>
              <div className="space-x-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="retro-button text-sm bg-retro-green text-retro-dark border-retro-dark"
                  >
                    EDIT
                  </button>
                )}
                <button
                  onClick={handleDeleteTask}
                  className="retro-button text-sm bg-terminal-red text-retro-cream border-retro-dark"
                >
                  DELETE
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 border-2 border-terminal-red text-terminal-red text-center">
                {error}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-retro-brown mb-1">TITLE:</h3>
                  <p className="text-lg text-retro-dark">{task.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-retro-brown mb-1">DESCRIPTION:</h3>
                  <p className="text-retro-dark">{task.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-retro-brown mb-1">STATUS:</h3>
                  <span className={`px-3 py-1 border-2 border-retro-dark font-bold ${
                    task.status === 'done' ? 'bg-retro-green text-retro-dark' :
                    task.status === 'in_progress' ? 'bg-retro-amber text-retro-dark' :
                    'bg-retro-cream text-retro-dark'
                  }`}>
                    {task.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                {task.due_date && (
                  <div>
                    <h3 className="text-sm font-bold text-retro-brown mb-1">DUE DATE:</h3>
                    <p className="text-retro-dark">
                      {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-retro-brown mb-1">CREATED:</h3>
                  <p className="text-retro-dark">
                    {new Date(task.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-retro-brown mb-1">LAST UPDATED:</h3>
                  <p className="text-retro-dark">
                    {new Date(task.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-retro-brown">TITLE:</label>
                  <input
                    type="text"
                    value={editedTask?.title || ''}
                    onChange={(e) => setEditedTask(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="retro-input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-retro-brown">DESCRIPTION:</label>
                  <textarea
                    value={editedTask?.description || ''}
                    onChange={(e) => setEditedTask(prev => prev ? {...prev, description: e.target.value} : null)}
                    className="retro-input w-full h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-retro-brown">STATUS:</label>
                  <select
                    value={editedTask?.status || 'todo'}
                    onChange={(e) => setEditedTask(prev => prev ? {...prev, status: e.target.value as any} : null)}
                    className="retro-input w-full"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-retro-brown">DUE DATE:</label>
                  <input
                    type="date"
                    value={editedTask?.due_date?.split('T')[0] || ''}
                    onChange={(e) => setEditedTask(prev => prev ? {...prev, due_date: e.target.value} : null)}
                    className="retro-input w-full"
                  />
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="retro-button">SAVE CHANGES</button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditedTask(task); }}
                    className="retro-button bg-terminal-red text-retro-cream border-retro-dark"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t-4 border-retro-dark bg-retro-brown p-4 text-retro-cream">
        <div className="container mx-auto text-center">
          <p className="terminal-text text-sm">[RETROTASK] © 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default TaskDetail;
