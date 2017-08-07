import React from 'react';
import PropTypes from 'prop-types';

const CancelButton = ({ value, ...props }) => (
  <div className="cancel-button">
    <style jsx>{`
      .cancel-button {
        display: inline-block;
      }
    `}</style>
    <button id={props.name} {...props}>
      {value}
    </button>
  </div>
);

CancelButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CancelButton.defaultProps = {
  value: 'Cancel',
};

export default CancelButton;
