/*
  To check and applt minimum no of characters in password
 */
const checkAndApplyMin = (validation, min) => {
  if (min) {
    validation.min(min);
  }
};

/*
To check and applt minimum no of characters in password
 */
const checkAndApplyMax = (validation, max) => {
  if (max) {
    validation.max(max);
  }
};

/*
  To check and apply if password needs to have uppercase characters
 */
const checkAndApplyUppercase = (validation, uppercase) => {
  if (uppercase) {
    validation
      .has()
      .uppercase();
  }
};

/*
  To check and apply if password needs to have lowercase characters
 */
const checkAndApplyLowercase = (validation, lowercase) => {
  if (lowercase) {
    validation
      .has()
      .lowercase();
  }
};

/*
  To check and apply if password should have digits
 */
const checkAndApplyDigits = (validation, digits) => {
  if (digits) {
    validation
      .has()
      .digits();
  }
};

/*
  To check and apply if password should be refrained from having spaces
 */
const checkAndApplyNoSpaces = (validation, noSpaces) => {
  if (noSpaces) {
    validation
      .not()
      .spaces();
  }
};

/*
  To check whether or not password should contain symbols
 */
const checkAndApplySymbols = (validation, symbols) => {
  if (symbols) {
    validation
      .has()
      .symbols();
  }
};

/*
  Method to apply rules to the passed validation
 */
const applyRules = (validation, props) => {
  checkAndApplyMin(validation, props.min);
  checkAndApplyMax(validation, props.max);
  checkAndApplyUppercase(validation, props.uppercase);
  checkAndApplyLowercase(validation, props.lowercase);
  checkAndApplyDigits(validation, props.digits);
  checkAndApplyNoSpaces(validation, props.noSpaces);
  checkAndApplySymbols(validation, props.symbols);
};

export default applyRules;
