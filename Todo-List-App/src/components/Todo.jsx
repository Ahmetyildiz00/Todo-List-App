import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function Todo({ id, name, completed, editTask, deleteTask, toggleTaskCompleted }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor={id} className="form-label">
          {name} için yeni isim
        </label>
        <input
          id={id}
          className="form-control"
          type="text"
          value={newName}
          onChange={handleChange}
          placeholder="Yeni görev ismi girin"
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setEditing(false)}>
          İptal
        </button>
        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="d-flex align-items-center justify-content-between">
      <div className="form-check">
        <input
          id={id}
          type="checkbox"
          className="form-check-input"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id} className="form-check-label">
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setEditing(true)}
          ref={editButtonRef}>
          Düzenle
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => deleteTask(id)}>
          Sil
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="list-group-item">{isEditing ? editingTemplate : viewTemplate}</li>;
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired
};