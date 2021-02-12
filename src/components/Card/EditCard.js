import React, { memo } from "react";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import InputText from "components/InputText";
import { userDefault } from "constants/users";

// Is the edit user form layout
const EditCard = ({ item, onClick, onChange, onCancel }) => {
  const {
    id,
    login = {},
    name = {},
    picture,
    location = {},
    phone,
    email
  } = item;
  return (
    <>
      <div key={login.uuid} className="card-header">
        <button
          value={login.uuid}
          onClick={() => onClick(item)}
          className="card-edit"
        >
          <SaveIcon className="card-edit-icon" />
        </button>
        <button
          value={login.uuid}
          onClick={() => onCancel(item)}
          className="card-cancel"
        >
          <CloseIcon className="card-cancel-icon" />
        </button>
        <div className="card-content-name__container">
          <div className="card-content-name__right">
            <InputText
              label="Name"
              name="name.first"
              small={true}
              value={name.first}
              variant="secondary"
              onChange={(e) => onChange(e, item)}
            />
          </div>
          <div className="card-content-name__left">
            <InputText
              label="Last Name"
              name="name.last"
              small={true}
              value={name.last}
              variant="secondary"
              onChange={(e) => onChange(e, item)}
            />
          </div>
        </div>
        <img className="card-picture" src={picture.large} alt={id} />
      </div>
      <div className="card-content">
        <InputText
          label="Email"
          name="email"
          small={true}
          value={email}
          onChange={(e) => onChange(e, item)}
        />
        <InputText
          label="Phone"
          name="phone"
          small={true}
          value={phone}
          onChange={(e) => onChange(e, item)}
        />
        <div className="card-content-inputs__container">
          <div className="card-content-inputs__right">
            <InputText
              label="City"
              name="city"
              small={true}
              value={location.city}
              onChange={(e) => onChange(e, item)}
            />
          </div>
          <div className="card-content-inputs__left">
            <InputText
              label="State"
              name="state"
              small={true}
              value={location.state}
              onChange={(e) => onChange(e, item)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

EditCard.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  item: PropTypes.object
};

EditCard.defaultProps = {
  item: userDefault,
  onClick: () => {},
  onChange: () => {},
  onCancel: () => {}
};

export default memo(EditCard);
