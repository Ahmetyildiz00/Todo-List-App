import React, { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const FILTER_MAP = {
  Tümü: () => true,
  Aktif: (task) => !task.completed,
  Tamamlanan: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ tasks }) {
  const [taskList, setTasks] = useState(tasks);
  const [filter, setFilter] = useState("Tümü");

  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = taskList.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = taskList.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...taskList, newTask]);
  }

  const taskNoun = taskList.length !== 1 ? "görevler" : "görev";
  const headingText = `${taskList.length} ${taskNoun} kaldı`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(taskList.length);

  useEffect(() => {
    if (taskList.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [taskList.length, prevTaskLength]);

  const renderedTaskList = taskList
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterButtons = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp container my-4">
      <h1 className="text-center mb-4">Todo React App</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group my-3">
        {filterButtons}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef} className="text-center">
        {headingText}
      </h2>
      <ul
        className="todo-list list-group"
        aria-labelledby="list-heading">
        {renderedTaskList}
      </ul>
    </div>
  );
}

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })).isRequired
};

export default App;