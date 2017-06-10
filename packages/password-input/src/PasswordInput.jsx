/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import PasswordValidation from 'password-validator';
import { pickHTMLProps as pickProps } from 'pick-react-known-prop';

import map from 'lodash.map';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import intersection from 'lodash.intersection';
import pickBy from 'lodash.pickby';
import keys from 'lodash.keys';
import isNull from 'lodash.isnull';

import applyRules from './applyRules';

const isTrueOrNonZeroNumber = value => (value === true || value > 0);

const validations = [
  'uppercase',
  'lowercase',
  'min',
  'max',
  'digits',
  'noSpaces',
  'symbols',
];

const validationMessages = (validation, quant) => {
  const messages = {
    uppercase: 'Should contain atleast one uppercase letter',
    lowercase: 'Should contain atleast one lowercase letter',
    min: `Should not be less than ${quant} characters`,
    max: `Should not be more than ${quant} characters`,
    digits: 'Should contain atleast one numeric character',
    noSpaces: 'Should not have spaces between characters',
    symbols: 'Should have atleast one symbol',
  };

  return messages[validation];
};

class Password extends Component {
  constructor(props) {
    super();
    this.state = {
      passwordValidity: null,
    };
    this.validation = new PasswordValidation();
    applyRules(this.validation, pick(props, validations));

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
    const passwordValidity = this.validation.validate(password, { list });
    this.setState({
      passwordValidity,
    });
    this.props.onChange(passwordValidity, password);
  }

  renderPasswordValidityWithList() {
    const passwordValidity = this.state.passwordValidity;
    const renderValidity = validation => (
      <li key={validation}>
        {
          passwordValidity.indexOf(validation) > -1 ?
          (<span>&#10006;</span>) :
          (<span>&#10003;</span>)
        }
        <span>{validationMessages(validation)}</span>
      </li>
    );

    const availableValidations = intersection(keys(pickBy(
      this.props,
      isTrueOrNonZeroNumber,
    )), validations);

    return (
      <div className="password-validity">
        <ul>{map(availableValidations, renderValidity)}</ul>
      </div>
    );
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
      <div>
        <input
          ref={this.assignPasswordInputRef}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          type="password"
          {...pickProps(omit(this.props, omittedDefaultProps))}
        />
        {isNull(this.state.passwordValidity) ? null : this.renderPasswordValidityWithList()}
      </div>
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
  /**
   * specifies whether password validity needs to be shown or not
   */
  showValidity: PropTypes.bool,
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
  showValidity: true,
};

export default Password;
