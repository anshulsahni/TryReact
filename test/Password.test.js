/* eslint-disable */
const React = require('react');
const enzyme = require('enzyme');
const expect = require('chai').expect;
const sinon = require('sinon');

const shallow = enzyme.shallow;
const mount = enzyme.mount;

const TryReactPassword = require('../src/Password.jsx').default;

describe('<TryReactPassword />', function() {

  describe('Should render everytime with correct attributes', function() {

    it('should render component with type password', function() {
      const wrapper = shallow(<TryReactPassword />);
      expect(wrapper.find('input[type="password"]'))
      .to
      .have
      .length(1);
    });

    it('should render Password with correct className', function() {
      const sampleClassName = 'password';
      const wrapper = shallow(<TryReactPassword className={sampleClassName} />);
      expect(wrapper.find('.' + sampleClassName)).to.have.length(1);
    });

    it('should render Password with correct id', function() {
      const sampleId = 'password-input';
      const wrapper = shallow(<TryReactPassword id={sampleId} />);
      expect(wrapper.find('#' + sampleId)).to.have.length(1);
    });

  });

  describe('Handlers check', function() {

    it('should call onChange handler method', function() {
      const handleChange = sinon.spy();
      const wrapper =   mount(<TryReactPassword onChange={handleChange} />);
      const input = wrapper.find('input');
      input.get(0).value = 'password';
      input.first().simulate('change');
      expect(handleChange.calledOnce).to.equal(true);
    });

  });

  describe('Checking password validity with different conditions', function() {

    describe('For Min', function() {

      it('should return password as valid', function() {
        const handleChange = sinon.spy();
        const props = {
          onChange: handleChange,
          min: 6,
        };
        const wrapper = mount(<TryReactPassword {...props} />);
        const input = wrapper.find('input');
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.equal(true);
      });

      it('should return password as invalid', function() {
        const handleChange = sinon.spy();
        const props = {
          onChange: handleChange,
          min: 15,
        };
        const wrapper = mount(<TryReactPassword {...props} />);
        const input = wrapper.find('input');
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.equal(false);
      });

    });

    describe('For Max', function() {

      it('should return password as valid', function() {
        const handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            max={15}
          />
        );
        const input = wrapper.find('input');
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.equal(true);
      });

      it('should return password as invalid', function() {
        const handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            max={6}
          />
        );
        const input = wrapper.find('input');
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });

    describe('For Uppercase characters', function() {
      var handleChange;
      var input;

      beforeEach(function() {
        handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            uppercase
          />
        );
        input = wrapper.find('input');
      });

      it('should return password as valid', function() {
        input.get(0).value = 'Password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.true;

      });

      it('should return password as invalid', function() {
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });

    describe('For lowercase characters', function() {
      var handleChange;
      var input;

      beforeEach(function() {
        handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            lowercase
          />
        );
        input = wrapper.find('input');
      });

      it('should return password as valid', function() {
        input.get(0).value = 'PASsWORD123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.true;
      });

      it('should return password as invalid', function() {
        input.get(0).value = 'PASSWORD123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });

    describe('For digits (numerical characters)', function() {
      var handleChange;
      var input;

      beforeEach(function() {
        handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            digits
          />
        );
        input = wrapper.find('input');
      });

      it('should return password as valid', function() {
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.true;
      });

      it('should return password as inavlid', function() {
        input.get(0).value = 'password';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });

    describe('For noSpaces', function() {
      var handleChange;
      var input;

      beforeEach(function() {
        handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            noSpaces
          />
        );
        input = wrapper.find('input');
      });

      it('should return password as valid', function() {
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.true;
      });

      it('should return password as invalid', function() {
        input.get(0).value = 'password 123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });

    describe('For symbols', function() {
      var handleChange;
      var input;

      beforeEach(function() {
        handleChange = sinon.spy();
        const wrapper = mount(
          <TryReactPassword
            onChange={handleChange}
            symbols
          />
        );
        input = wrapper.find('input');
      });

      it('should return password as valid', function() {
        input.get(0).value = 'password@123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.true;
      });

      it('should return password as invalid', function() {
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(handleChange.getCall(0).args[0]).to.be.false;
      });

    });


  });

  describe('Checking other props', function() {

    describe('Value prop', function() {

      it('should render input element with value passed as prop', function() {
        const wrapper = mount(<TryReactPassword value="password123" />);
        const value = wrapper.find('input').get(0).value;
        expect(value).to.equal('password123');
      });

    });

  });

});
