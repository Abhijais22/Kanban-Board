import React from 'react';

const TaskCard = ({ task, provided }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        ...provided.draggableProps.style,
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assignees:</strong> {task.assignees.map((user) => user.name).join(', ') || 'None'}</p>
    </div>
  );
};

export default TaskCard;
