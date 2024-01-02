import React from 'react';
import PropTypes from 'prop-types';

function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      className={`btn ${isPressed ? 'btn-success' : 'btn-outline-secondary'}`}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default FilterButton;