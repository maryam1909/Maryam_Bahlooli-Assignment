import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await register(formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create your account</h2>
          <p className="text-base-content/60">It’s quick and easy</p>
          {error && <div className="alert alert-error text-sm mt-2">{error}</div>}
          {message && <div className="alert alert-success text-sm mt-2">{message}</div>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Username</span></label>
              <input className="input input-bordered" type="text" name="username" placeholder="yourname" onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input className="input input-bordered" type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input className="input input-bordered" type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <button className="btn btn-primary w-full" type="submit">Create account</button>
          </form>
          <div className="text-sm text-base-content/60 mt-4">Already have an account? <Link className="link link-primary" to="/login">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
