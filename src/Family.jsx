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
      <Family key={child.id} member={child} />
    ));
  }

  render() {
    const member = this.props.member;
    return (
      <div>
        <Member
          id={member.id}
          name={member.name}
          image={member.image}
          dob={member.dob}
          dod={member.dod}
        />
        {this.renderChildren()}
      </div>
    );
  }
}

Family.propTypes = {
  member: PropTypes.object,
};

Family.defaultProps = {
  member: {},
};

export default Family;
