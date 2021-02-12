import React, { memo } from "react";
import PropTypes from "prop-types";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { userDefault } from "constants/users";

import "./styles.scss";

// renders the Card component, handles 2 layouts (view / edit)
const Card = ({ item, edit, onClick, onCancel, onChange }) => {
  return (
    <div className="card-container">
      {!edit && <ViewCard item={item} onClick={onClick} />}
      {edit && (
        <EditCard
          item={item}
          onClick={onClick}
          onChange={onChange}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

Card.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  item: PropTypes.object,
  edit: PropTypes.bool
};

Card.defaultProps = {
  item: userDefault,
  edit: false,
  onClick: () => {},
  onCancel: () => {},
  onChange: () => {}
};

export default memo(Card);
