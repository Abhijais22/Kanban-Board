import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState({ title: '', description: '', status: 'Dev in progress' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask(form);
      onTaskCreated(data);
      setForm({ title: '', description: '', status: 'Dev in progress' });
      alert('Task created successfully!');
    } catch (error) {
      alert('Failed to create task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      >
        <option value="Dev in progress">Dev in progress</option>
        <option value="QA in progress">QA in progress</option>
        <option value="In Rework">In Rework</option>
        <option value="Closed">Closed</option>
      </select>
      <button type="submit" style={{ padding: '10px 20px' }}>Create Task</button>
    </form>
  );
};

export default TaskForm;
