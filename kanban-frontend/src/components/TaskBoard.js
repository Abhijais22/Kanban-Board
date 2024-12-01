import React, { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const task = tasks.find((t) => t._id === result.draggableId);

    if (task) {
      const updatedTask = { ...task, status: destination.droppableId };
      await updateTask(task._id, updatedTask);
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Dev in progress', 'QA in progress', 'In Rework', 'Closed'].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: 250, minHeight: 400, border: '1px solid #ddd', padding: 10 }}>
                <h3>{col}</h3>
                {tasks.filter((task) => task.status === col).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <TaskCard task={task} provided={provided} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
