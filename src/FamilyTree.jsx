import React, { Component, PropTypes } from 'react';

import Family from './Family';

class FamilyTree extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave() {
    this.props.onSave();
    // TODO
  }

  handleDelete() {
    this.props.onDelete();
    // TODO
  }

  handleChange() {
    this.props.onChange();
    // TODO
  }

  render() {
    return (
      <Family member={this.props.family} />
    );
  }
}

FamilyTree.propTypes = {
  family: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
};

FamilyTree.defaultProps = {
  family: {},
  onSave: () => {},
  onDelete: () => {},
  onChange: () => {},
};

export default FamilyTree;
