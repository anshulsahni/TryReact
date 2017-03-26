const React = require('react');
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;

const TryReactPassword = require('../src/Password.jsx').default;

describe('<TryReactPassword />', function() {

  it('should render component with type password', function() {
    const wrapper = shallow(<TryReactPassword />)
    expect(wrapper.find('input[type="password"]'))
      .to
      .have
      .length(1);
  });
  
});
