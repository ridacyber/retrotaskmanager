import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'todo' as const
  });
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'SYSTEM ERROR: TASK LOAD FAILED');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', due_date: '', status: 'todo' });
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'SYSTEM ERROR: TASK CREATION FAILED');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'SYSTEM ERROR: TASK DELETION FAILED');
    }
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    done: tasks.filter(task => task.status === 'done')
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div className="pixel-card mb-4 transform hover:scale-105 transition-transform">
      <h3 className="font-bold text-lg mb-2 text-arcade-green font-terminal">{task.title}</h3>
      <p className="text-arcade-gray font-terminal mb-2">{task.description}</p>
      {task.due_date && (
        <p className="text-sm text-arcade-amber font-terminal mb-2">
          DUE: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}
      <div className="flex space-x-2">
        <Link
          to={`/task/${task.id}`}
          className="arcade-button text-xs bg-arcade-amber text-arcade-black border-arcade-amber"
        >
          EDIT
        </Link>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="arcade-button text-xs bg-arcade-red text-arcade-white border-arcade-red"
        >
          DELETE
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center crt-screen bg-arcade-black">
        <div className="text-center">
          <div className="status-led active mx-auto mb-4"></div>
          <div className="terminal-text text-2xl animate-pulse">LOADING GAME...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col crt-screen bg-arcade-black">
      <header className="border-b-4 border-arcade-green bg-arcade-darker p-4 pixel-border">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-arcade-green arcade-title">
            [RETROTASK]
          </Link>
          <div className="flex items-center space-x-4">
            <div className="status-led active"></div>
            <span className="text-arcade-green font-terminal">PLAYER: {user?.name?.toUpperCase()}</span>
            <button onClick={logout} className="arcade-button text-xs">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 crt-gradient">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-arcade-green arcade-title animate-glow">
            [GAME DASHBOARD]
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="arcade-button bg-arcade-amber text-arcade-black border-arcade-amber"
          >
            {showAddForm ? '✖ CANCEL' : '➕ NEW QUEST'}
          </button>
        </div>

        <div className="mb-8">
          <div className="inline-block pixel-card">
            <div className="flex space-x-8">
              <div>
                <div className="text-arcade-green terminal-text text-sm">ACTIVE QUESTS</div>
                <div className="text-2xl font-bold text-arcade-amber">{tasksByStatus.todo.length + tasksByStatus.in_progress.length}</div>
              </div>
              <div>
                <div className="text-arcade-green terminal-text text-sm">COMPLETED</div>
                <div className="text-2xl font-bold text-arcade-green">{tasksByStatus.done.length}</div>
              </div>
              <div>
                <div className="text-arcade-green terminal-text text-sm">TOTAL SCORE</div>
                <div className="text-2xl font-bold text-arcade-amber">{tasksByStatus.done.length * 100}</div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 border-4 border-arcade-red text-arcade-red text-center pixel-border animate-blink">
            <span className="arcade-subtitle">SYSTEM ERROR:</span> {error}
          </div>
        )}

        {showAddForm && (
          <div className="pixel-card mb-8">
            <h3 className="text-xl font-bold mb-4 text-arcade-green arcade-title">[NEW QUEST]</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  QUEST TITLE:
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="pixel-input w-full"
                  placeholder="ENTER_QUEST_NAME"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  QUEST DESCRIPTION:
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="pixel-input w-full h-24"
                  placeholder="QUEST_DETAILS_HERE"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  DUE DATE:
                </label>
                <input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                  className="pixel-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  QUEST STATUS:
                </label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({...newTask, status: e.target.value as any})}
                  className="pixel-input w-full"
                >
                  <option value="todo">NEW QUEST</option>
                  <option value="in_progress">IN PROGRESS</option>
                  <option value="done">COMPLETED</option>
                </select>
              </div>
              <button type="submit" className="arcade-button">
                ▶ CREATE QUEST
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4 text-arcade-green arcade-subtitle">[NEW QUESTS]</h2>
            {tasksByStatus.todo.length === 0 ? (
              <p className="text-arcade-gray font-terminal">No new quests available</p>
            ) : (
              tasksByStatus.todo.map(task => <TaskCard key={task.id} task={task} />)
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-arcade-amber arcade-subtitle">[ACTIVE]</h2>
            {tasksByStatus.in_progress.length === 0 ? (
              <p className="text-arcade-gray font-terminal">No active quests</p>
            ) : (
              tasksByStatus.in_progress.map(task => <TaskCard key={task.id} task={task} />)
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-arcade-green arcade-subtitle">[COMPLETED]</h2>
            {tasksByStatus.done.length === 0 ? (
              <p className="text-arcade-gray font-terminal">No completed quests</p>
            ) : (
              tasksByStatus.done.map(task => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>
      </main>

      <footer className="border-t-4 border-arcade-green bg-arcade-darker p-4 text-arcade-green pixel-border">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4">
            <div className="status-led active"></div>
            <p className="terminal-text text-xs">
              [RETROTASK] © 2026 | 8-BIT ARCADE EDITION
            </p>
            <div className="status-led active"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
