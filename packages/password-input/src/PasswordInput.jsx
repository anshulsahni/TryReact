/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import PasswordValidation from 'password-validator';
import { pickHTMLProps as pickProps } from 'pick-react-known-prop';

import omit from 'lodash.omit';
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
      'noSpaces',
      'symbols',
    ]));

    // binding unbound methods
    this.handleChange = this.handleChange.bind(this);
    this.assignPasswordInputRef = this.assignPasswordInputRef.bind(this);
  }

  assignPasswordInputRef(ref) {
    this.password = ref;
  }

  handleChange() {
    const password = this.password.value || '';
    const list = this.props.list;
    this.props.onChange(this.validation.validate(password, { list }), password);
  }

  render() {
    const omittedDefaultProps = [
      'onChange',
      'value',
      'defaultValue',
      'type',
      'min',
      'max',
    ];

    return (
      <input
        ref={this.assignPasswordInputRef}
        defaultValue={this.props.value}
        onChange={this.handleChange}
        type="password"
        {...pickProps(omit(this.props, omittedDefaultProps))}
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
  max: PropTypes.number, // eslint-disable-line react/require-default-props
  /**
   * specifies the minimum number characters in password
   * no min chars in password, unless specified
   */
  min: PropTypes.number,  // eslint-disable-line react/require-default-props
  /**
   * specifies whether or not password should contain symbols
   */
  symbols: PropTypes.bool,
  /**
   * specfies whether to return list of failed validations or only if they have failed or not
   */
  list: PropTypes.bool,
};

Password.defaultProps = {
  value: '',
  onChange: () => {},
  noSpaces: false,
  uppercase: false,
  lowercase: false,
  digits: false,
  symbols: false,
  list: true,
};

export default Password;
