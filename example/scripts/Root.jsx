/*  global require, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Example from '../../src';

class Root extends React.Component {
  render() {
    return (
      <Example />
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));
