import React from 'react';
import PropTypes from 'prop-types';

const CancelButton = ({ value, ...props }) => (
  <div className="cancel-button">
    <style jsx>{`
      .cancel-button {
        display: inline-block;
      }
    `}</style>
    <button {...props}>
      {value}
    </button>
  </div>
);

CancelButton.propTypes = {
  value: PropTypes.string,
};

CancelButton.defaultProps = {
  value: 'Cancel',
};

export default CancelButton;
