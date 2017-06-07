import React, { Component, PropTypes } from 'react';

import { updateFamily } from './helpers';
import Family from './Family';

class FamilyTree extends Component {
  constructor(props) {
    super();
    this.state = {
      family: props.family,
    };

    // handle methods bound to `this`
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSave() {
    this.props.onSave();
    // TODO
  }

  handleDelete() {
    this.props.onDelete();
    // TODO
  }

  handleUpdate(member) {
    this.setState({
      family: updateFamily(this.state.family, member),
    });
    this.props.onChange();
  }

  render() {
    return (
      <Family
        member={this.state.family}
        onUpdate={this.handleUpdate}
      />
    );
  }
}

FamilyTree.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
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
