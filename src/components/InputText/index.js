import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import cn from "classnames";

// just a customized input text
const InputText = ({ label, name, onChange, small, value, variant }) => {
  return (
    <div className={cn("input-text", { small: small })}>
      <input
        type="input"
        value={value}
        className={cn("form_field", {
          small: small,
          secondary: variant === "secondary"
        })}
        placeholder={label}
        onChange={onChange}
        name={name}
        id={name}
      />
      <label
        htmlFor={name}
        className={cn("form_label", {
          small: small,
          secondary: variant === "secondary"
        })}
      >
        {label}
      </label>
    </div>
  );
};

InputText.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  small: PropTypes.bool
};

InputText.defaultProps = {
  label: "",
  name: "",
  onChange: () => {},
  small: false,
  value: "",
  variant: ""
};

export default InputText;
