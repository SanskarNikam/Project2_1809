import React, { useState, useContext } from "react";
import { db } from "../backend/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import '../taskform.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState(""); 
  const [reference, setReference] = useState(""); 
  const [attachment, setAttachment] = useState(""); 
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const newTask = {
      title,
      description,
      timeSpent,
      category,
      priority,
      reference,
      attachment,
      uid: user.uid,
      timestamp: new Date(),
    };

    try {
      
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      console.log("Task logged with ID:", docRef.id);
      addTask(newTask); 

      
      alert("Task successfully added!");

    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error adding task. Please try again.");
    }

    
    setTitle("");
    setDescription("");
    setTimeSpent("");
    setCategory("");
    setPriority(""); 
    setReference("");
    setAttachment(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="taskform-container">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="taskform-input"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="taskform-textarea"
      />
      <input
        type="number"
        placeholder="Time Spent (hours)"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
        required
        className="taskform-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="taskform-select"
      >
        <option value="">Select Category</option>
        <option value="BAU">BAU</option>
        <option value="Ad Hoc">Ad Hoc</option>
        <option value="Project-Based">Project-Based</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
        className="taskform-select"
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="text"
        placeholder="Reference (Manager or Colleague)"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        className="taskform-input"
      />
      <input
        type="text"
        placeholder="Attachment/Link (Optional)"
        value={attachment}
        onChange={(e) => setAttachment(e.target.value)}
        className="taskform-input"
      />
      <button type="submit" className="taskform-button">Log Task</button>
    </form>
  );
};

export default TaskForm;
