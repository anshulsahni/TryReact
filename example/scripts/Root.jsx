/*  global require, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Password from '../../src';

const Root = () => (
  <div>
    <Password />
  </div>
);

ReactDOM.render(<Root />, document.getElementById('app'));
