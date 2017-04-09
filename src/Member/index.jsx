import React, { Component, PropTypes } from 'react';

import head from 'lodash.head';

import ViewMember from './View';
import EditMember from './Edit';
import AddMember from './Add';

const availableModes = [
  'view',
  'edit',
  'add',
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
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  setMode(mode) {
    this.setState({ mode });
  }

  assignRef(refName) {
    return (ref) => {
      this[refName] = ref;
    };
  }

  handleAddClick() {
    this.setMode('add');
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
      case 'add':
      case 'view':
        return (
          <div>
            <ViewMember
              id={member.id}
              name={member.name}
              image={member.image}
              dob={member.dob}
              dod={member.dod}
              onEditClick={this.handleEditClick}
            />
            {
              this.state.mode === 'add' ? (
                <AddMember id={member.id} />
              ) : null
            }
          </div>
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
        <input
          name="add"
          type="button"
          value="Add Child"
          onClick={this.handleAddClick}
        />
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
