import React, { useEffect, useState } from 'react';
import { getTaskById } from '../api';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await getTaskById(id);
        setTask(data);
      } catch (error) {
        alert('Failed to fetch task details.');
      }
    };
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading task details...</p>;

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assignees:</strong> {task.assignees.map((user) => user.name).join(', ') || 'None'}</p>
    </div>
  );
};

export default TaskDetails;
