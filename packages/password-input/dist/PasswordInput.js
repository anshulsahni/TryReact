'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _passwordValidator = require('password-validator');

var _passwordValidator2 = _interopRequireDefault(_passwordValidator);

var _pickReactKnownProp = require('pick-react-known-prop');

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.pick');

var _lodash4 = _interopRequireDefault(_lodash3);

var _applyRules = require('./applyRules');

var _applyRules2 = _interopRequireDefault(_applyRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-unused-prop-types */


var Password = function (_Component) {
  _inherits(Password, _Component);

  function Password(props) {
    _classCallCheck(this, Password);

    var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this));

    _this.validation = new _passwordValidator2.default();
    (0, _applyRules2.default)(_this.validation, (0, _lodash4.default)(props, ['uppercase', 'lowercase', 'min', 'max', 'digits', 'noSpaces', 'symbols']));

    // binding unbound methods
    _this.handleChange = _this.handleChange.bind(_this);
    _this.assignPasswordInputRef = _this.assignPasswordInputRef.bind(_this);
    return _this;
  }

  _createClass(Password, [{
    key: 'assignPasswordInputRef',
    value: function assignPasswordInputRef(ref) {
      this.password = ref;
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      var password = this.password.value || '';
      this.props.onChange(this.validation.validate(password), password);
    }
  }, {
    key: 'render',
    value: function render() {
      var omittedDefaultProps = ['onChange', 'value', 'defaultValue', 'type', 'min', 'max'];

      return _react2.default.createElement('input', _extends({
        ref: this.assignPasswordInputRef,
        defaultValue: this.props.value,
        onChange: this.handleChange,
        type: 'password'
      }, (0, _pickReactKnownProp.pickHTMLProps)((0, _lodash2.default)(this.props, omittedDefaultProps))));
    }
  }]);

  return Password;
}(_react.Component);

Password.propTypes = {
  /**
  * value of password text
  */
  value: _react.PropTypes.string,
  /**
  * method called everytime value is changed in text
  */
  onChange: _react.PropTypes.func,
  /**
   * specifies whether password should contain atleast one uppercase characters
   */
  uppercase: _react.PropTypes.bool,
  /**
   * specifies whether password should contain atleast one lowercase chars
   */
  lowercase: _react.PropTypes.bool,
  /**
   * specifies that password should contain digits
   */
  digits: _react.PropTypes.bool,
  /**
   * specifies that password should not contain any spaces
   */
  noSpaces: _react.PropTypes.bool,
  /**
  * specifies the maximum number characters in password
  * no max chars in password, unless specified
  */
  max: _react.PropTypes.number, // eslint-disable-line react/require-default-props
  /**
   * specifies the minimum number characters in password
   * no min chars in password, unless specified
   */
  min: _react.PropTypes.number, // eslint-disable-line react/require-default-props
  /**
   * specifies whether or not password should contain symbols
   */
  symbols: _react.PropTypes.bool
};

Password.defaultProps = {
  value: '',
  onChange: function onChange() {},
  noSpaces: false,
  uppercase: false,
  lowercase: false,
  digits: false,
  symbols: false
};

exports.default = Password;