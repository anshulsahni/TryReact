/*  global require, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Password from '../../src';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordValid: false,
      password: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(passwordValid, password) {
    this.setState({
      passwordValid,
      password,
    });
  }

  renderPasswordValidity() {
    return this.state.passwordValid ?
      <span style={{ color: 'green' }}>Valid</span> :
      <span style={{ color: 'red' }}>Invalid</span>;
  }

  render() {
    return (
      <div>
        <Password
          uppercase
          lowercase
          digits
          onChange={this.handleOnChange}
          className="password-input"
        />
        <div>
          The password text is <b>{this.state.password}</b> and it is {this.renderPasswordValidity()} password
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));
