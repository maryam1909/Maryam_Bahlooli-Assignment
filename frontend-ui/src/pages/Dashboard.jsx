import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    await createTask(newTask);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow">
        <div className="container-app w-full flex justify-between">
          <div className="text-xl font-semibold">Task Dashboard</div>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="container-app py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Create New Task</h2>
            <form onSubmit={handleCreate} className="mt-2 space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Title</span></label>
                <input className="input input-bordered" type="text" placeholder="e.g. Prepare report" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description</span></label>
                <textarea className="textarea textarea-bordered" placeholder="Optional details" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
              </div>
              <button className="btn btn-primary w-full" type="submit">Add Task</button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title">Your Tasks</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                {tasks.map((task) => (
                  <div key={task.id} className="card bg-base-100 border border-base-200">
                    <div className="card-body">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{task.title}</h3>
                          <div className="badge badge-outline mt-1">{task.status}</div>
                        </div>
                      </div>
                      {task.description && <p className="mt-2 text-sm opacity-80">{task.description}</p>}
                      <div className="card-actions justify-end mt-2">
                        <button className="btn btn-outline btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center text-base-content/60 col-span-full">No tasks yet. Create your first task.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
