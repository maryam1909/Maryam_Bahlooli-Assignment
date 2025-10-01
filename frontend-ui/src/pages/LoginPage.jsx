import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome back</h2>
          <p className="text-base-content/60">Log in to continue</p>
          {error && <div className="alert alert-error text-sm mt-2">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input className="input input-bordered" type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input className="input input-bordered" type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <button className="btn btn-primary w-full" type="submit">Sign in</button>
          </form>
          <div className="text-sm text-base-content/60 mt-4">Don't have an account? <Link className="link link-primary" to="/register">Create one</Link></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
