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
import isEmpty from 'lodash.isempty';

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

const GreenTick = () => (
  <span>
    <style jsx>{`
      span {
        color: green;
      }
    `}
    </style>
    &#10003;
  </span>
);

const RedCross = () => (
  <span>
    <style jsx>{`
      span {
        color: red;
      }
    `}
    </style>
    &#10006;
  </span>
);

class Password extends Component {
  constructor(props) {
    super();
    this.state = {
      passwordValidity: props.list ? [] : null,
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

  renderPasswordValidityWithoutList() {
    return (
      <div className="password-validity list-less">
        {this.state.passwordValidity ? <GreenTick /> : <RedCross />}
      </div>
    );
  }

  renderPasswordValidityWithList() {
    const passwordValidity = this.state.passwordValidity;
    const renderValidity = validation => (
      <li key={validation}>
        {!isEmpty(passwordValidity) && passwordValidity.indexOf(validation) === -1 ? <GreenTick /> : <RedCross />}
        <span>{validationMessages(validation)}</span>
      </li>
    );

    const availableValidations = intersection(keys(pickBy(
      this.props,
      isTrueOrNonZeroNumber,
    )), validations);

    return (
      <div className="password-validity list">
        <ul>{map(availableValidations, renderValidity)}</ul>
      </div>
    );
  }

  renderPasswordValidity() {
    return this.props.list ? this.renderPasswordValidityWithList() : this.renderPasswordValidityWithoutList();
  }

  render() {
    const omittedProps = [
      'onChange',
      'value',
      'defaultValue',
      'type',
      'min',
      'max',
      'className',
    ];

    return (
      <div className={`${this.props.wrapperClass} password-input`}>
        <input
          type="password"
          ref={this.assignPasswordInputRef}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          className={`${this.props.className} input`}
          {...pickProps(omit(this.props, omittedProps))}
        />
        {this.props.showValidity ? this.renderPasswordValidity() : null }
        <style jsx>{`
            .password-input {
              display: inline-block;
            }
        `}</style>
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
  /**
   * gives the className to the root element
   */
  wrapperClass: PropTypes.string,
  /**
   * append class to input element
   */
  className: PropTypes.string,
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
  className: '',
  wrapperClass: '',
};

export default Password;
