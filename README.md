# try-react-password
A password input component which accepts certain qualifications for password to valid as props and then returns whether password is valid or in the callback

## Installation

```
npm install try-react-password
```

## How to use it ?

```
import Password from 'try-react-password';

handleChange(passwordValid, password) {
  console.log(passwordValid, password);
}

<Password
  uppercase
  lowercase
  digits
  onChange={this.handleChange}
/>
```
## Password Validations available pas props

| Validation | type | Description |
| :--- | :---: | :--- |
| uppercase | Boolean | specifies whether password should contain uppercase characters |
| lowercase | Boolean |specifies whether password should contain lowercase characters |
| digits | Boolean | specifies that password should contain digits |
| noSpaces | Boolean |specifies that password should not contain any spaces |
| max | Number | specifies the maximum number characters in password no max chars in password, unless specified |
| min | Number | specifies the minimum number characters in password no min chars in password, unless specified |
| symbols | Boolean | specifies whether or not password should contain symbols |

Note: *All the above props/validation if **Boolean** has default value as **false**, and **others** are **undefined** *
## Other Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| value | String | value of password text |
| onChange | Function | method called everytime value is changed in password input field, has passwordValidity and password value in arguments |
