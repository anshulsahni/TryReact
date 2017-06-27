import React from 'react';
import PropTypes from 'prop-types';

const SaveButton = ({ value, ...props }) => (
  <div className="save-button">
    <style jsx>{`
      .save-button {
        display: inline-block;
      }
    `}</style>
    <button id={props.name} {...props}>
      {value}
    </button>
  </div>
);

SaveButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

SaveButton.defaultProps = {
  value: 'Save',
};

export default SaveButton;
