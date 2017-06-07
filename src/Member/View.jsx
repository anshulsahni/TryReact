import React, { PropTypes } from 'react';

const View = props => (
  <div className="view">
    <div className="image">
      <img
        alt={props.name}
        src={props.image}
      />
    </div>
    <div className="name">
      {props.name}
    </div>
    <div className="dob">
      {props.dob}
    </div>
    {props.dod ? <div className="dod"> - {props.dod}</div> : null}
    <input
      name="edit"
      type="button"
      value="edit"
      onClick={props.onEditClick}
    />
  </div>
);

View.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  dob: PropTypes.string,
  dod: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
};

View.defaultProps = {
  name: '',
  image: '',
  dob: '',
  dod: undefined,
};

export default View;
