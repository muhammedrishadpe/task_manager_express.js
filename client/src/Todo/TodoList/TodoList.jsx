import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoEdit from "../TodoEdit/TodoEdit";
import axios from "axios";

export const TodoList = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [editTodoId, setEditTodeId] = useState("");
  const [todosValues, setTodosValus] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const API_URL = "http://localhost:3005/api/todo";

  const fetchTodo = async () => {
    try {
      const response = await axios(API_URL);
      setTodosValus(response.data);
    
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  
  //Add
  const addItem = async () => {
    if (newTodo) {
    try{
      const response = await axios(API_URL,{method:"POST", data:{
        todo:newTodo,
      }
    });
    setTodosValus(response.data);
    setAddInput("");
    }catch(error){
      // console.log(error);
    }
    }
    
  };
  const onChangeValue = (event) => {
    setNewTodo(event.target.value);
  };

  //Edit
  const onEdit = (index) => {
    setClickedIndex(index);
  };

  const handleEdit = async ( id, newValue) => {
if(newValue) {
  try{
    const response = await axios(API_URL,{method:"PUT", data:{
      id:id,
      todo:newValue,
      isCompleted:false,
    }
  });
setTodosValus(response.data);
setEditTodeId("");
  }catch(error){
    console.log(error.response.data.message);
  }
}
  };

  //Delete
  const onDelete = async (id) => {
    try{
      const response = await axios(API_URL,{method:"DELETE", data:{
        id,//id:id
      }
    });
    setTodosValus(response.data);
    }catch(error){
      console.log(error.response.data.message);
    }
  };

  const toggleSelect = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  return (
    <div className="todo-list-container">
      <div className="todo-add-container">
        <input
          type="text"
          value={newTodo}
          onChange={onChangeValue}
          placeholder="New Todo"
        />
        <button onClick={() => addItem()}>Add Item</button>
      </div>

      {/* Todo List */}

      {todosValues.map((data, index) => (
        <div key={data.id} className="">
          {clickedIndex === index ? (
            <TodoEdit
              onCancel={() => setClickedIndex(null)}
              value={data.todo}
              onSave={(newValue) => handleEdit(data.id,newValue)}
            />
          ) : (
            <div className={"todo-list"}>
              <div className="p-container">
                <p
                  onClick={() => toggleSelect(index)}
                  style={{
                    textDecorationLine: selectedIndexes.includes(index)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {data.todo}
                </p>
              </div>
              <div id="buttons">
                <button onClick={() => onEdit(index)}>
                  <img
                    width="25px"
                    height="25px"
                    style={{ filter: "invert(100%)" }}
                    src="../src/assets/img/edit.png"
                    alt="Edit"
                  />
                </button>
                <button onClick={() => onDelete(data.id)}>
                  <img
                    width="25px"
                    height="25px"
                    src="../src/assets/img/delete.png"
                    alt="Delete"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
