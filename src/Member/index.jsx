import React, { Component, PropTypes } from 'react';

import head from 'lodash.head';

import ViewMember from './View';

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
  }

  handleEditClick() {
    this.setState({
      mode: 'edit',
    });
  }

  renderModes() {
    const member = this.props.member;
    switch (this.state.mode) {
      case 'view':
        return (
          <ViewMember
            name={member.name}
            image={member.image}
            dob={member.dob}
            dod={member.dod}
            onEditClick={this.handleEditClick}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div id={this.props.id}>
        {this.renderModes()}
      </div>
    );
  }
}

Member.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  member: PropTypes.object,
};

Member.defaultProps = {
  member: {},
};

export default Member;
