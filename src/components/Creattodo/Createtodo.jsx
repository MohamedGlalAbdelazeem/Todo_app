import React from 'react';

function Createtodo({ inputText, setinputText, onAdd }) {
  const handleAddTodo = async (e) => {
    e.preventDefault();
     
    const newTodo = {
      title: inputText,
      completed: false,
    };
    try {
      const res = await fetch('https://6689378d0ea28ca88b8753bb.mockapi.io/tasks', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTodo),
      });

      if (res.ok) {
        const todo = await res.json();
        onAdd(todo);
        setinputText("");
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("An error occurred while adding the todo", error);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input 
        type="text" 
        required 
        value={inputText} 
        onChange={(e) => setinputText(e.target.value)} 
      />
      <button onClick={(e)=>{handleAddTodo(e)}}  disabled={!inputText.trim()} type="submit">Add Task</button>
    </form>
  );
}

export default Createtodo;
