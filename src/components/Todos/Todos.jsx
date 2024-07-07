import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./todos.css";
import Createtodo from "../Creattodo/Createtodo";
import Removetodo from "../Removetodo.jsx/Removetodo";
import Completedtodos from "../Completedtodos/Completedtodos";


function Todos() {
  const [tasksList, setTasksList] = useState([]);
  const [inputText, setinputText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch('https://6689378d0ea28ca88b8753bb.mockapi.io/tasks', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(tasks => {
      setTasksList(tasks);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleAddCallback = (newTodo) => {
    setTasksList([newTodo, ...tasksList]); // Prepend the new task
    toast("You added a new todo ✔️", { type: "success" });
  };

  const handleDeleteCallback = (id) => {
    alert("Do you need delete this todo ❌");
    setTasksList(tasksList.filter(task => task.id !== id));
  };

  const handleCompleteCallback = (id, completed) => {
    setTasksList(tasksList.map(task =>
      task.id === id ? { ...task, completed } : task
    ));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTasksList([]);
      toast("All todos have been deleted ❌", { type: "success" });
    }
  };
  const filteredTasks = useMemo(() => {
    return tasksList.filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true; 
    });
  }, [tasksList, filter]);

  return (
    <div className="get-todos">
      <h2>Todos</h2>
      <form>
        <Createtodo inputText={inputText} setinputText={setinputText} onAdd={handleAddCallback} />
      </form>
      <div className="filter-buttons">
        <button 
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button 
          className={filter === "incomplete" ? "active" : ""}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
        <button 
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      </div>
      <div className="todos-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="todo-item">
            <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
            <div className="icons">
              <Removetodo id={task.id} onDelete={handleDeleteCallback} />
              <Completedtodos id={task.id} completed={task.completed} onComplete={handleCompleteCallback} />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Todos;
