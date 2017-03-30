const React = require('react');
const enzyme = require('enzymy');
const expect = require('chai').expect;

const shallow = enzyme.shallow;

const Example = require('../src/Example.jsx').default;

describe('<Example />', function() {
  it('should render component correctly', function() {
    const wrapper = shallo(<Example />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
