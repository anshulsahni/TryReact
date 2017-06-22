/*  global require, document */
import React from 'react';
import ReactDOM from 'react-dom';

import FamilyTree from '../../src';

const sampleFamily = {
  id: 1,
  name: 'Jagdish Chandra Sahni',
  dob: '29-04-1930',
  children: [
    {
      id: 2,
      name: 'Bharat Bhushan Sahni',
      dob: '27-09-1963',
      children: [
        {
          id: 3,
          name: 'Anshul Sahni',
          dob: '17-09-1993',
          children: [],
        },
        {
          id: 4,
          name: 'Arpit Sahni',
          dob: '29-06-1998',
          children: [],
        },
      ],
    },
  ],
};

class Root extends React.Component {
  render() {
    return (
      <FamilyTree family={sampleFamily} />
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));
