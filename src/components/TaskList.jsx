import React from "react";
import '../tasklist.css'

const TaskList = ({ tasks }) => {
  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">Task Timeline</h2>
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <p className="task-time">Time Spent: {task.timeSpent} hours</p>
          <p className="task-category">Category: {task.category}</p>
          <p className="task-priority">Priority: {task.priority}</p>
          <p className="task-reference">Assigned by: {task.reference}</p>
          {task.attachment && (
            <p className="task-attachment">
              <a href={task.attachment} target="_blank" rel="noopener noreferrer">
                View Attachment/Link
              </a>
            </p>
          )}
          <p className="task-timestamp">
            Timestamp:{" "}
            {task.timestamp
              ? task.timestamp.toDate
                ? task.timestamp.toDate().toLocaleString() // Convert Firestore Timestamp to Date
                : "Invalid timestamp"
              : "No timestamp"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
