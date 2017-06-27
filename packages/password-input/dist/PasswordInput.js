'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _passwordValidator = require('password-validator');

var _passwordValidator2 = _interopRequireDefault(_passwordValidator);

var _pickReactKnownProp = require('pick-react-known-prop');

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.pick');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.intersection');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.pickby');

var _lodash10 = _interopRequireDefault(_lodash9);

var _lodash11 = require('lodash.keys');

var _lodash12 = _interopRequireDefault(_lodash11);

var _lodash13 = require('lodash.isnull');

var _lodash14 = _interopRequireDefault(_lodash13);

var _lodash15 = require('lodash.isarray');

var _lodash16 = _interopRequireDefault(_lodash15);

var _lodash17 = require('lodash.replace');

var _lodash18 = _interopRequireDefault(_lodash17);

var _applyRules = require('./applyRules');

var _applyRules2 = _interopRequireDefault(_applyRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-unused-prop-types */


var isTrueOrNonZeroNumber = function isTrueOrNonZeroNumber(value) {
  return value === true || value > 0;
};

var validations = ['uppercase', 'lowercase', 'min', 'max', 'digits', 'noSpaces', 'symbols'];

var getAvlblValidations = function getAvlblValidations(props) {
  return (0, _lodash8.default)((0, _lodash12.default)((0, _lodash10.default)(props, isTrueOrNonZeroNumber)), validations);
};

var getEmptyPasswordValidity = function getEmptyPasswordValidity(props) {
  return props.list ? getAvlblValidations(props) : null;
};

var validationMessages = function validationMessages(validation, quant) {
  var messages = {
    uppercase: 'Should contain atleast one uppercase letter',
    lowercase: 'Should contain atleast one lowercase letter',
    min: 'Should not be less than ' + quant + ' characters',
    max: 'Should not be more than ' + quant + ' characters',
    digits: 'Should contain atleast one numeric character',
    noSpaces: 'Should not have spaces between characters',
    symbols: 'Should have atleast one symbol'
  };

  return messages[validation];
};

// eslint-disable-next-line max-len
var eyeIconBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjUyIiB3aWR0aD0iODQiIHk9Ii0xIiB4PSItMSIvPiA8L2c+IDxnPiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPiAgPGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBkPSJtNDEuOTI0OTk5LDEuMDI2OTg2Yy0xNS4yODE1NjIsMCAtMjkuMTM5NjgyLDguMzYwNjgzIC0zOS4zNjU1NjYsMjEuOTQwNjU5Yy0wLjgzNDQzMiwxLjExMjU3NiAtMC44MzQ0MzIsMi42NjY5MTEgMCwzLjc3OTQ4N2MxMC4yMjU4ODUsMTMuNTk2MzM3IDI0LjA4NDAwNCwyMS45NTcwMiAzOS4zNjU1NjYsMjEuOTU3MDJzMjkuMTM5NjgyLC04LjM2MDY4MyAzOS4zNjU1NjYsLTIxLjk0MDY1OWMwLjgzNDQzMiwtMS4xMTI1NzYgMC44MzQ0MzIsLTIuNjY2OTExIDAsLTMuNzc5NDg3Yy0xMC4yMjU4ODUsLTEzLjU5NjMzNyAtMjQuMDg0MDA0LC0yMS45NTcwMiAtMzkuMzY1NTY2LC0yMS45NTcwMnptMS4wOTYyMTUsNDAuNjI1Mzk1Yy0xMC4xNDQwNzgsMC42MzgwOTUgLTE4LjUyMTEyMywtNy43MjI1ODggLTE3Ljg4MzAyNywtMTcuODgzMDI3YzAuNTIzNTY1LC04LjM3NzA0NSA3LjMxMzU1MywtMTUuMTY3MDMyIDE1LjY5MDU5OCwtMTUuNjkwNTk4YzEwLjE0NDA3OCwtMC42MzgwOTUgMTguNTIxMTIzLDcuNzIyNTg4IDE3Ljg4MzAyNywxNy44ODMwMjdjLTAuNTM5OTI3LDguMzYwNjgzIC03LjMyOTkxNCwxNS4xNTA2NzEgLTE1LjY5MDU5OCwxNS42OTA1OTh6bS0wLjUwNzIwNCwtNy43NTUzMTFjLTUuNDY0NzEzLDAuMzQzNTkgLTkuOTgwNDY0LC00LjE1NTggLTkuNjIwNTEyLC05LjYyMDUxMmMwLjI3ODE0NCwtNC41MTU3NTEgMy45NDMxMDEsLTguMTY0MzQ2IDguNDU4ODUyLC04LjQ1ODg1MmM1LjQ2NDcxMywtMC4zNDM1OSA5Ljk4MDQ2NCw0LjE1NTggOS42MjA1MTIsOS42MjA1MTJjLTAuMjk0NTA1LDQuNTMyMTEyIC0zLjk1OTQ2Myw4LjE4MDcwOCAtOC40NTg4NTIsOC40NTg4NTJ6Ii8+ICA8L2c+IDwvZz48L3N2Zz4=';

var GreenTick = function GreenTick() {
  return _react2.default.createElement(
    'span',
    {
      'data-jsx': 647915208
    },
    _react2.default.createElement(_style2.default, {
      styleId: 647915208,
      css: 'span[data-jsx="647915208"]{color:green}'
    }),
    '\u2713'
  );
};

var RedCross = function RedCross() {
  return _react2.default.createElement(
    'span',
    {
      'data-jsx': 1535297024
    },
    _react2.default.createElement(_style2.default, {
      styleId: 1535297024,
      css: 'span[data-jsx="1535297024"]{color:red}'
    }),
    '\u2716'
  );
};

var Password = function (_Component) {
  _inherits(Password, _Component);

  function Password(props) {
    _classCallCheck(this, Password);

    var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this));

    _this.state = {
      passwordValidity: getEmptyPasswordValidity(props),
      showPassword: false
    };
    _this.validation = new _passwordValidator2.default();
    (0, _applyRules2.default)(_this.validation, (0, _lodash6.default)(props, validations));

    // binding unbound methods
    _this.handleChange = _this.handleChange.bind(_this);
    _this.toggleShowPassword = _this.toggleShowPassword.bind(_this);
    _this.assignPasswordInputRef = _this.assignPasswordInputRef.bind(_this);
    return _this;
  }

  _createClass(Password, [{
    key: 'assignPasswordInputRef',
    value: function assignPasswordInputRef(ref) {
      this.password = ref;
    }
  }, {
    key: 'toggleShowPassword',
    value: function toggleShowPassword() {
      this.setState({
        showPassword: !this.state.showPassword
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      var password = this.password.value;
      var list = this.props.list;
      var passwordValidity = password ? this.validation.validate(password, { list: list }) : getEmptyPasswordValidity(this.props);

      var replaceWith = {
        isMin: 'min',
        isMax: 'max',
        spaces: 'noSpaces'
      };
      var replaceIfNeedded = function replaceIfNeedded(validities) {
        return (0, _lodash2.default)(validities, function (validity) {
          return (0, _lodash18.default)(validity, /isMax|isMin|spaces/, function (pat) {
            return replaceWith[pat];
          });
        });
      };
      this.setState({
        passwordValidity: (0, _lodash16.default)(passwordValidity) ? replaceIfNeedded(passwordValidity) : passwordValidity
      });
      this.props.onChange(passwordValidity, password);
    }
  }, {
    key: 'renderPasswordValidityWithoutList',
    value: function renderPasswordValidityWithoutList() {
      return _react2.default.createElement(
        'div',
        { className: 'password-validity list-less', 'data-jsx': 596452250
        },
        _react2.default.createElement(_style2.default, {
          styleId: 596452250,
          css: '.password-validity.list-less[data-jsx="596452250"]{height:25px;width:25px;float:left;padding:3px 0;-webkit-text-align:center;text-align:center}'
        }),
        !(0, _lodash14.default)(this.state.passwordValidity) && (this.state.passwordValidity ? _react2.default.createElement(GreenTick, null) : _react2.default.createElement(RedCross, null))
      );
    }
  }, {
    key: 'renderPasswordValidityWithList',
    value: function renderPasswordValidityWithList() {
      var _this2 = this;

      var passwordValidity = this.state.passwordValidity;
      var renderValidity = function renderValidity(validation) {
        return _react2.default.createElement(
          'li',
          { key: validation, 'data-jsx': 2553595392
          },
          _react2.default.createElement(_style2.default, {
            styleId: 2553595392,
            css: 'li[data-jsx="2553595392"]{list-style-type:none}'
          }),
          passwordValidity.indexOf(validation) === -1 ? _react2.default.createElement(GreenTick, null) : _react2.default.createElement(RedCross, null),
          _react2.default.createElement(
            'span',
            {
              'data-jsx': 2553595392
            },
            validationMessages(validation, validation === 'min' ? _this2.props.min : _this2.props.max)
          )
        );
      };

      var availableValidations = getAvlblValidations(this.props);

      return _react2.default.createElement(
        'div',
        { className: 'password-validity list', 'data-jsx': 2137515968
        },
        _react2.default.createElement(_style2.default, {
          styleId: 2137515968,
          css: '.password-validity.list[data-jsx="2137515968"]{position:absolute;visibility:hidden;background-color:rgba(0, 0, 0, 0.2);border:1px solid #000;border-radius:4px;margin-left:15px;margin-top:30px;max-width:calc(100% - 15px);box-sizing:border-box}.password-validity.list[data-jsx="2137515968"] ul[data-jsx="2137515968"]{padding:0 10px;margin:10px 0}'
        }),
        _react2.default.createElement(
          'ul',
          {
            'data-jsx': 2137515968
          },
          (0, _lodash2.default)(availableValidations, renderValidity)
        )
      );
    }
  }, {
    key: 'renderShowPasswordBtn',
    value: function renderShowPasswordBtn() {
      var showPasswordClass = this.state.showPassword ? 'on' : 'off';
      return _react2.default.createElement(
        'div',
        { className: showPasswordClass + ' show-password', 'data-jsx': 1717931011
        },
        _react2.default.createElement(_style2.default, {
          styleId: 1717931011,
          css: '.show-password[data-jsx="1717931011"]{height:25px;width:25px;display:inline-block}.show-password.on[data-jsx="1717931011"]{opacity:0.8}.show-password.off[data-jsx="1717931011"]{opacity:0.2}.show-password[data-jsx="1717931011"] button[data-jsx="1717931011"]{height:100%;width:100%;box-sizing:border-box;background-image:url(' + eyeIconBase64 + ');background-repeat:no-repeat;background-position:center center;background-size:contain;background-color:transparent;border:none;outline:none;cursor:pointer}'
        }),
        _react2.default.createElement('button', { onClick: this.toggleShowPassword, 'data-jsx': 1717931011
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var omittedProps = ['onChange', 'value', 'defaultValue', 'type', 'min', 'max', 'className'];
      var _props = this.props,
          showPassword = _props.showPassword,
          showValidity = _props.showValidity,
          list = _props.list;

      var widthClass = showPassword ? 'with-show-password' : 'without-show-password';
      var validityClass = showValidity && !list ? 'show-validity' : 'hide-validity';
      return _react2.default.createElement(
        'div',
        { className: this.props.className + ' ' + widthClass + ' ' + validityClass + ' password-input', 'data-jsx': 780010005
        },
        _react2.default.createElement('input', _extends({
          type: this.state.showPassword ? 'text' : 'password',
          ref: this.assignPasswordInputRef,
          defaultValue: this.props.value,
          onChange: this.handleChange,
          className: this.props.inputClass + ' input'
        }, (0, _pickReactKnownProp.pickHTMLProps)((0, _lodash4.default)(this.props, omittedProps)), {
          'data-jsx': 780010005
        })),
        showValidity && !list ? this.renderPasswordValidityWithoutList() : null,
        this.props.showPassword ? this.renderShowPasswordBtn() : null,
        showValidity && list ? this.renderPasswordValidityWithList() : null,
        _react2.default.createElement(_style2.default, {
          styleId: 509473068,
          css: '.password-input[data-jsx="780010005"]{display:inline-block;border:1px solid;height:27px;box-sizing:border-box;display:inherit;border-radius:4px;overflow:hidden;padding-right:2px}.password-input[data-jsx="780010005"] input[data-jsx="780010005"]{float:left;box-sizing:border-box;height:25px;border:1px solid;border:none;outline:none;padding-left:2px}.with-show-password.hide-validity[data-jsx="780010005"] input[data-jsx="780010005"],.without-show-password.show-validity[data-jsx="780010005"] input[data-jsx="780010005"]{width:calc(100% - 25px)}.with-show-password.show-validity[data-jsx="780010005"] input[data-jsx="780010005"]{width:calc(100% - 25px - 25px)}.without-show-password.hide-validity[data-jsx="780010005"] input[data-jsx="780010005"]{width:100%}'
        }),
        _react2.default.createElement(_style2.default, {
          styleId: 1979381500,
          css: '.password-input input:focus~.password-validity.list{visibility:visible}'
        })
      );
    }
  }]);

  return Password;
}(_react.Component);

Password.propTypes = {
  /**
  * value of password text
  */
  value: _propTypes2.default.string,
  /**
  * method called everytime value is changed in text
  */
  onChange: _propTypes2.default.func,
  /**
   * specifies whether password should contain atleast one uppercase characters
   */
  uppercase: _propTypes2.default.bool,
  /**
   * specifies whether password should contain atleast one lowercase chars
   */
  lowercase: _propTypes2.default.bool,
  /**
   * specifies that password should contain digits
   */
  digits: _propTypes2.default.bool,
  /**
   * specifies that password should not contain any spaces
   */
  noSpaces: _propTypes2.default.bool,
  /**
  * specifies the maximum number characters in password
  * no max chars in password, unless specified
  */
  max: _propTypes2.default.number, // eslint-disable-line react/require-default-props
  /**
   * specifies the minimum number characters in password
   * no min chars in password, unless specified
   */
  min: _propTypes2.default.number, // eslint-disable-line react/require-default-props
  /**
   * specifies whether or not password should contain symbols
   */
  symbols: _propTypes2.default.bool,
  /**
   * specfies whether to return list of failed validations or only if they have failed or not
   */
  list: _propTypes2.default.bool,
  /**
   * specifies whether password validity needs to be shown or not
   */
  showValidity: _propTypes2.default.bool,
  /**
   * display `show password` button
   */
  showPassword: _propTypes2.default.bool,
  /**
  * append class to input element
  */
  inputClass: _propTypes2.default.string,
  /**
  * gives the className to the root element
  */
  className: _propTypes2.default.string
};

Password.defaultProps = {
  value: '',
  onChange: function onChange() {},
  noSpaces: false,
  uppercase: false,
  lowercase: false,
  digits: false,
  symbols: false,
  list: true,
  showValidity: true,
  className: '',
  inputClass: '',
  showPassword: false
};

exports.default = Password;