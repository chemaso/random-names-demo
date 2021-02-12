import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./styles.scss";

// simple button to sort by name
const SortField = ({ options, onChange, selected }) => {
  return (
    <div className="sort-field-container">
      <h2 className="sort-field-title">Sort By:</h2>
      <div className="btn-group">
        {options.map(({ id, label, value }) => (
          <button
            className={cn("button", { selected: selected === value })}
            key={id}
            onClick={onChange}
            value={value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

SortField.propTypes = {
  onChange: PropTypes.func,
  selected: PropTypes.string,
  options: PropTypes.array
};

SortField.defaultProps = {
  options: [],
  onChange: () => {},
  selected: ""
};

export default SortField;
