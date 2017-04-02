import React, { Component, PropTypes } from 'react';

class FamilyTree extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Family Tree</div>
    );
  }
}

FamilyTree.propTypes = {
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
};

FamilyTree.defaultProps = {
  onSave: () => {},
  onDelete: () => {},
  onChange: () => {},
};

export default FamilyTree;
