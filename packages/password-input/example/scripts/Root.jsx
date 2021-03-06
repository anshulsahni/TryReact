/*  global require, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Password from '../../src';

const Root = () => (
  <div>
    <div>
      <Password uppercase lowercase digits showPassword />
    </div>
    <div>
      <Password uppercase lowercase digits list={false} showPassword />
    </div>
    <div>
      <Password uppercase lowercase digits list={false} />
    </div>
  </div>
);

ReactDOM.render(<Root />, document.getElementById('app'));
