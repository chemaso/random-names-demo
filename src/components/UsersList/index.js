import React, { memo } from "react";
import Card from "components/Card";
import PropTypes from "prop-types";
import get from "lodash/get";

import "./styles.scss";

// memoized component to render the user cards
const UsersList = ({ list, onClick, onCancel, onChange, edit }) => {
  return (
    <div className="users-list-container">
      {list.map((item) => {
        const id = get(item, "login.uuid", "");
        return (
          <div key={id} className="users-list-item">
            <Card
              item={item}
              onClick={onClick}
              onCancel={onCancel}
              onChange={onChange}
              edit={edit === id}
            />
          </div>
        );
      })}
    </div>
  );
};

UsersList.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  edit: PropTypes.string,
  list: PropTypes.array
};

UsersList.defaultProps = {
  edit: "",
  list: [],
  onClick: () => {},
  onCancel: () => {},
  onChange: () => {}
};

export default memo(UsersList);
