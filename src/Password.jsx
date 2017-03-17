import React, { Component, PropTypes } from 'react';
import PasswordValidation from 'password-validator';

import applyRules from './applyRules';

class Password extends Component {
  constructor(props) {
    super();
    this.validation = new PasswordValidation();
    applyRules(this.validation, props);

    // binding unbound methods
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const password = this.refs.password.value;
    this.props.onChange(validation.validate(password), password);
  }

  render() {
    return (
      <input
        ref="password"
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

Password.propTypes = {
  /**
   * value of password text
   */
  value: PropTypes.string,
};

Password.defaultProps = {
  value: '',
};

export default Password;
