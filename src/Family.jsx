import React, { Component, PropTypes } from 'react';

import map from 'lodash.map';
import head from 'lodash.head';

import Member from './Member';

const availableModes = [
  'open',
  'close',
];

class Family extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: head(availableModes),
    };
  }

  renderChildren() {
    return map(this.props.member.children, child => (
      <Family
        key={child.id}
        member={child}
        onUpdate={this.props.onUpdate}
      />
    ));
  }

  render() {
    return (
      <div>
        <Member
          member={this.props.member}
          onUpdate={this.props.onUpdate}
          onAdd={this.props.onAdd}
        />
        {this.renderChildren()}
      </div>
    );
  }
}

Family.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  member: PropTypes.object,
};

Family.defaultProps = {
  member: {},
};

export default Family;
