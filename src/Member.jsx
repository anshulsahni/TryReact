import React, { Component, PropTypes } from 'react';

import head from 'lodash.head';

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
  }

  render() {
    return (
      <div id={this.props.id}>
        <div className="image">
          <img
            alt={this.props.name}
            src={this.props.image}
          />
        </div>
        <div className="name">
          {this.props.name}
        </div>
        <div className="dob">
          {this.props.dob}
        </div>
        {this.props.dod ? <div className="dod"> - {this.props.dod}</div> : null}
      </div>
    );
  }
}

Member.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  dob: PropTypes.string,
  dod: PropTypes.string,
};

Member.defaultProps = {
  name: '',
  image: '',
  dob: '',
  dod: undefined,
};

export default Member;
