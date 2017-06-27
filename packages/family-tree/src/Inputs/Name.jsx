import React from 'react';
import PropTypes from 'prop-types';

const NameInput = props => (
  <div className="name-input">
    <style jsx>{`
        .name-input {
          display: inline-block
        }
    `}</style>
    <input
      id={props.name}
      {...props}
    />
  </div>
);

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NameInput;
