/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PasswordValidation from 'password-validator';
import { pickHTMLProps as pickProps } from 'pick-react-known-prop';

import map from 'lodash.map';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import intersection from 'lodash.intersection';
import pickBy from 'lodash.pickby';
import keys from 'lodash.keys';
import isNull from 'lodash.isnull';
import isArray from 'lodash.isarray';
import replace from 'lodash.replace';
import lowerFirst from 'lodash.lowerfirst';
import join from 'lodash.join';
import split from 'lodash.split';
import trim from 'lodash.trim';

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

const getAvlblValidations = props => intersection(keys(pickBy(props, isTrueOrNonZeroNumber)), validations);

const getEmptyPasswordValidity = props => (props.list ? getAvlblValidations(props) : null);

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

// eslint-disable-next-line max-len
const eyeIconBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjUyIiB3aWR0aD0iODQiIHk9Ii0xIiB4PSItMSIvPiA8L2c+IDxnPiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPiAgPGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBkPSJtNDEuOTI0OTk5LDEuMDI2OTg2Yy0xNS4yODE1NjIsMCAtMjkuMTM5NjgyLDguMzYwNjgzIC0zOS4zNjU1NjYsMjEuOTQwNjU5Yy0wLjgzNDQzMiwxLjExMjU3NiAtMC44MzQ0MzIsMi42NjY5MTEgMCwzLjc3OTQ4N2MxMC4yMjU4ODUsMTMuNTk2MzM3IDI0LjA4NDAwNCwyMS45NTcwMiAzOS4zNjU1NjYsMjEuOTU3MDJzMjkuMTM5NjgyLC04LjM2MDY4MyAzOS4zNjU1NjYsLTIxLjk0MDY1OWMwLjgzNDQzMiwtMS4xMTI1NzYgMC44MzQ0MzIsLTIuNjY2OTExIDAsLTMuNzc5NDg3Yy0xMC4yMjU4ODUsLTEzLjU5NjMzNyAtMjQuMDg0MDA0LC0yMS45NTcwMiAtMzkuMzY1NTY2LC0yMS45NTcwMnptMS4wOTYyMTUsNDAuNjI1Mzk1Yy0xMC4xNDQwNzgsMC42MzgwOTUgLTE4LjUyMTEyMywtNy43MjI1ODggLTE3Ljg4MzAyNywtMTcuODgzMDI3YzAuNTIzNTY1LC04LjM3NzA0NSA3LjMxMzU1MywtMTUuMTY3MDMyIDE1LjY5MDU5OCwtMTUuNjkwNTk4YzEwLjE0NDA3OCwtMC42MzgwOTUgMTguNTIxMTIzLDcuNzIyNTg4IDE3Ljg4MzAyNywxNy44ODMwMjdjLTAuNTM5OTI3LDguMzYwNjgzIC03LjMyOTkxNCwxNS4xNTA2NzEgLTE1LjY5MDU5OCwxNS42OTA1OTh6bS0wLjUwNzIwNCwtNy43NTUzMTFjLTUuNDY0NzEzLDAuMzQzNTkgLTkuOTgwNDY0LC00LjE1NTggLTkuNjIwNTEyLC05LjYyMDUxMmMwLjI3ODE0NCwtNC41MTU3NTEgMy45NDMxMDEsLTguMTY0MzQ2IDguNDU4ODUyLC04LjQ1ODg1MmM1LjQ2NDcxMywtMC4zNDM1OSA5Ljk4MDQ2NCw0LjE1NTggOS42MjA1MTIsOS42MjA1MTJjLTAuMjk0NTA1LDQuNTMyMTEyIC0zLjk1OTQ2Myw4LjE4MDcwOCAtOC40NTg4NTIsOC40NTg4NTJ6Ii8+ICA8L2c+IDwvZz48L3N2Zz4=';

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
      passwordValidity: getEmptyPasswordValidity(props),
      showPassword: false,
    };
    this.validation = new PasswordValidation();
    applyRules(this.validation, pick(props, validations));

    // binding unbound methods
    this.handleChange = this.handleChange.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.assignPasswordInputRef = this.assignPasswordInputRef.bind(this);
  }

  assignPasswordInputRef(ref) {
    this.password = ref;
  }

  toggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleChange() {
    const password = this.password.value;
    const list = this.props.list;
    const passwordValidity = password ? this.validation.validate(password, { list }) : getEmptyPasswordValidity(this.props);
    this.setState({
      passwordValidity,
    });
    this.props.onChange(passwordValidity, password);
  }

  renderPasswordValidityWithoutList() {
    return (
      <div className="password-validity list-less">
        <style jsx>{`
            .password-validity.list-less {
              height: 25px;
              width: 25px;
              float: left;
              padding: 3px 0;
              text-align: center;
            }
        `}</style>
        {!isNull(this.state.passwordValidity) && (this.state.passwordValidity ? <GreenTick /> : <RedCross />)}
      </div>
    );
  }

  renderPasswordValidityWithList() {
    const passwordValidity = this.state.passwordValidity;
    const renderValidity = validation => (
      <li key={validation}>
        <style jsx>{`
            li {
              list-style-type: none;
            }
        `}</style>
        {passwordValidity.indexOf(validation) === -1 ? <GreenTick /> : <RedCross />}
        <span>{validationMessages(validation, validation === 'min' ? this.props.min : this.props.max)}</span>
      </li>
    );

    const availableValidations = getAvlblValidations(this.props);

    return (
      <div className="password-validity list">
        <style jsx>{`
            .password-validity.list {
              position: absolute;
              visibility: hidden;
              background-color: rgba(0, 0, 0, 0.2);
              border: 1px solid #000;
              border-radius: 4px;
              margin-left: 15px;
              max-width: calc(100% - 15px);
              box-sizing: border-box;
            }

            .password-validity.list ul {
              padding: 0 10px;
              margin: 10px 0;
            }
        `}</style>
        <ul>{map(availableValidations, renderValidity)}</ul>
      </div>
    );
  }

  renderShowPasswordBtn() {
    const showPasswordClass = this.state.showPassword ? 'on' : 'off';
    return (
      <div className={`${showPasswordClass} show-password`}>
        <style jsx>{`
            .show-password {
              height: 25px;
              width: 25px;
              display: inline-block;
            }

            .show-password.on {
              opacity: 0.8;
            }

            .show-password.off {
              opacity: 0.2;
            }

            .show-password button {
              height: 100%;
              width: 100%;
              box-sizing: border-box;
              background-image: url(${eyeIconBase64});
              background-repeat: no-repeat;
              background-position: center center;
              background-size: contain;
              background-color: transparent;
              border: none;
              outline: none;
              cursor: pointer;
            }
        `}</style>
        <button onClick={this.toggleShowPassword} />
      </div>
    );
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
    const { showPassword, showValidity, list } = this.props;
    const widthClass = showPassword ? 'with-show-password' : 'without-show-password';
    const validityClass = showValidity && !list ? 'show-validity' : 'hide-validity';
    return (
      <div className={`${this.props.wrapperClass} ${widthClass} ${validityClass} password-input`}>
        <input
          type={this.state.showPassword ? 'text' : 'password'}
          ref={this.assignPasswordInputRef}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          className={`${this.props.className} input`}
          {...pickProps(omit(this.props, omittedProps))}
        />
        {showValidity && !list ? this.renderPasswordValidityWithoutList() : null }
        {this.props.showPassword ? this.renderShowPasswordBtn() : null}
        {showValidity && list ? this.renderPasswordValidityWithList() : null }
        <style jsx>{`
          .password-input {
            display: inline-block;
            border: 1px solid;
            height: 27px;
            box-sizing: border-box;
            display: inherit;
            border-radius: 4px;
            overflow: hidden;
            padding-right: 2px;
          }

          .password-input input {
            float: left;
            box-sizing: border-box;
            height: 25px;
            border: 1px solid;
            border: none;
            outline: none;
            padding-left: 2px;
          }

          .with-show-password.hide-validity input,
          .without-show-password.show-validity input {
            width: calc(100% - 25px);
          }

          .with-show-password.show-validity input {
            width: calc(100% - 25px - 25px);
          }

          .without-show-password.hide-validity input {
            width: 100%;
          }
      `}</style>
        <style jsx global>{`
            .password-input input:focus ~ .password-validity.list {
              visibility: visible;
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
  /**
   * display `show password` button
   */
  showPassword: PropTypes.bool,
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
  showPassword: false,
};

export default Password;
