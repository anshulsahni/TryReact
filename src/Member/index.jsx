import React, { Component, PropTypes } from 'react';

import head from 'lodash.head';

import ViewMember from './View';
import EditMember from './Edit';

const availableModes = [
  'view',
  'edit',
];

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: head(availableModes),
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  setMode(mode) {
    this.setState({ mode });
  }

  assignRef(refName) {
    return (ref) => {
      this[refName] = ref;
    };
  }

  handleEditClick() {
    this.setState({
      mode: 'edit',
    });
  }

  handleSave() {
    this.props.onUpdate(this.edit.getValue());
    this.setMode('view');
  }

  handleCancel() {
    this.setMode('view');
  }

  renderModes() {
    const member = this.props.member;
    switch (this.state.mode) {
      case 'view':
        return (
          <ViewMember
            id={member.id}
            name={member.name}
            image={member.image}
            dob={member.dob}
            dod={member.dod}
            onEditClick={this.handleEditClick}
          />
        );
      case 'edit':
        return (
          <EditMember
            id={member.id}
            name={member.name}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            ref={this.assignRef('edit')}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div id={this.props.member.id}>
        {this.renderModes()}
      </div>
    );
  }
}

Member.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  member: PropTypes.object,
};

Member.defaultProps = {
  member: {},
};

export default Member;
