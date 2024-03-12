import React, { useEffect, useState } from "react";
import "../TodoEdit/TodoEdit.css";
const TodoEdit = ({ onCancel, value, onSave }) => {
  const [editInputValue, setEditInputValue] = useState("");

  const onEditHandler = (event) => {
    setEditInputValue(event.target.value);
    
  };

  const handleSave = () => {
    onSave(editInputValue);
  };

  useEffect(() => {
    setEditInputValue(value);
    console.log(editInputValue, "mount");
    return () => {
      console.log(editInputValue, "Unmount");
    };
  }, []);
  return (
    <div className="todo-edit-container">
      <input
        type="text"
        value={editInputValue}
        onChange={onEditHandler}
        placeholder="Edit Todo"
      />
      <button onClick={handleSave} id="save-button">
        SAVE
      </button>
      <button onClick={onCancel} id="cancel-button">
        CANCEL
      </button>
    </div>
  );
};

export default TodoEdit;
