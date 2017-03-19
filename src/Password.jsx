
import React, { Component, PropTypes } from 'react';
import PasswordValidation from 'password-validator';

import pick from 'lodash.pick';

import applyRules from './applyRules';

class Password extends Component {
  constructor(props) {
    super();
    this.validation = new PasswordValidation();
    applyRules(this.validation, pick(props, [
      'uppercase',
      'lowercase',
      'min',
      'max',
      'digits',
      'noSpaces'
    ]));

    // binding unbound methods
    this.handleChange = this.handleChange.bind(this);
    this.assignPasswordInputRef = this.assignPasswordInputRef.bind(this);
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
        defaultValue={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

Password.propTypes = {
  /**
   * specifies whether password should contain atleast one uppercase characters
   */
  uppercase: PropTypes.bool,
  /**
   * specifies whether password should contain atleast one lowercase chars
   */
  lowercase: PropTypes.bool,
  /**
   * specifies that password should contain digits
   */
  digits: PropTypes.bool,
  /**
   * specifies that password should not contain any spaces
   */
  noSpaces: PropTypes.bool,
  /**
  * specifies the maximum number characters in password
  * no max chars in password, unless specified
  */
  max: PropTypes.number,
  /**
   * specifies the minimum number characters in password
   * no min chars in password, unless specified
   */
  min: PropTypes.number,
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
  noSpaces: false,
  uppercase: false,
  lowercase: false,
  digits: false,
};

export default Password;
