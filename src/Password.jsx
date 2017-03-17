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

  assignPasswordInputRef(ref) {
    this.password = ref;
  }

  handleChange() {
    const password = this.password.value;
    this.props.onChange(this.validation.validate(password), password);
  }

  render() {
    return (
      <input
        ref={this.assignPasswordInputRef}
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
  /**
   * method called everytime value is changed in text
   */
  onChange: PropTypes.func,
};

Password.defaultProps = {
  value: '',
  onChange: () => {},
};

export default Password;
