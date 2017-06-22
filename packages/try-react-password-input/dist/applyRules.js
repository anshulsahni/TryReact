"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  To check and applt minimum no of characters in password
 */
var checkAndApplyMin = function checkAndApplyMin(validation, min) {
  if (min) {
    validation.isMin(min);
  }
};

/*
To check and applt minimum no of characters in password
 */
var checkAndApplyMax = function checkAndApplyMax(validation, max) {
  if (max) {
    validation.isMax(max);
  }
};

/*
  To check and apply if password needs to have uppercase characters
 */
var checkAndApplyUppercase = function checkAndApplyUppercase(validation, uppercase) {
  if (uppercase) {
    validation.has().uppercase();
  }
};

/*
  To check and apply if password needs to have lowercase characters
 */
var checkAndApplyLowercase = function checkAndApplyLowercase(validation, lowercase) {
  if (lowercase) {
    validation.has().lowercase();
  }
};

/*
  To check and apply if password should have digits
 */
var checkAndApplyDigits = function checkAndApplyDigits(validation, digits) {
  if (digits) {
    validation.has().digits();
  }
};

/*
  To check and apply if password should be refrained from having spaces
 */
var checkAndApplyNoSpaces = function checkAndApplyNoSpaces(validation, noSpaces) {
  if (noSpaces) {
    validation.not().spaces();
  }
};

/*
  To check whether or not password should contain symbols
 */
var checkAndApplySymbols = function checkAndApplySymbols(validation, symbols) {
  if (symbols) {
    validation.has().symbols();
  }
};

/*
  Method to apply rules to the passed validation
 */
var applyRules = function applyRules(validation, props) {
  checkAndApplyMin(validation, props.min);
  checkAndApplyMax(validation, props.max);
  checkAndApplyUppercase(validation, props.uppercase);
  checkAndApplyLowercase(validation, props.lowercase);
  checkAndApplyDigits(validation, props.digits);
  checkAndApplyNoSpaces(validation, props.noSpaces);
  checkAndApplySymbols(validation, props.symbols);
};

exports.default = applyRules;