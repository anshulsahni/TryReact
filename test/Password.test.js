const React = require('react');
const enzyme = require('enzyme');
const expect = require('chai').expect;
const sinon = require('sinon');

const shallow = enzyme.shallow;
const mount = enzyme.mount;

const TryReactPassword = require('../src/Password.jsx').default;

describe('<TryReactPassword />', function() {

  it('should render component with type password', function() {
    const wrapper = shallow(<TryReactPassword />)
    expect(wrapper.find('input[type="password"]'))
      .to
      .have
      .length(1);
  });

  it('should call onChange handler method', function() {
    const handleChange = sinon.spy();
    const wrapper =   mount(<TryReactPassword onChange={handleChange} />);
    const input = wrapper.find('input');
    input.get(0).value = 'password';
    input.first().simulate('change');
    console.log(handleChange);
    expect(handleChange.calledOnce).to.equal(true);
  });

});
