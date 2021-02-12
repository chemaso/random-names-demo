import React, { memo } from "react";
import PropTypes from "prop-types";
import { generateShowLocation, generateShowName } from "utils/strings";
import EditIcon from "@material-ui/icons/Edit";
import { userDefault } from "constants/users";

const ViewCard = ({ item, onClick }) => {
  const { id, login = {}, picture = {}, phone, email } = item;
  return (
    <>
      <div key={login.uuid} className="card-header">
        <button
          value={login.uuid}
          onClick={() => onClick(item, "edit")}
          className="card-edit"
        >
          <EditIcon className="card-edit-icon" />
        </button>
        <h3>{generateShowName(item)}</h3>
        <img className="card-picture" src={picture.large} alt={id} />
      </div>
      <div className="card-content">
        <p>{email}</p>
        <p>{phone}</p>
        <p>{generateShowLocation(item)}</p>
      </div>
    </>
  );
};

ViewCard.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.object
};

ViewCard.defaultProps = {
  item: userDefault,
  onClick: () => {}
};

export default memo(ViewCard);
