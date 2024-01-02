import React, { useState } from "react";
import PropTypes from 'prop-types';

function Form({ addTask }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="new-todo-input" className="form-label">
          Yapılacak iş nedir?
        </label>
        <input
          type="text"
          id="new-todo-input"
          className="form-control"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
          placeholder="Yapılacak bir görev girin"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Ekle
      </button>
    </form>
  );
}

Form.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default Form;