/* eslint-disable */
const React = require('react');
const enzyme = require('enzyme');
const expect = require('chai').expect;
const sinon = require('sinon');

const shallow = enzyme.shallow;
const mount = enzyme.mount;

const PasswordInput = require('../src/PasswordInput.jsx').default;

describe('<PasswordInput />', function() {

  describe('Should render everytime with correct attributes', function() {

    it('should render component with type password', function() {
      const wrapper = shallow(<PasswordInput />);
      expect(wrapper.find('input[type="password"]'))
      .to
      .have
      .length(1);
    });

    it('should render Password with correct className', function() {
      const sampleClassName = 'password';
      const wrapper = shallow(<PasswordInput className={sampleClassName} />);
      expect(wrapper.find('.' + sampleClassName)).to.have.length(1);
    });

    it('should render Password with correct id', function() {
      const sampleId = 'password-input';
      const wrapper = shallow(<PasswordInput id={sampleId} />);
      expect(wrapper.find('#' + sampleId)).to.have.length(1);
    });

  });

  describe('Handlers check', function() {

    it('should call onChange handler method', function() {
      const handleChange = sinon.spy();
      const wrapper =   mount(<PasswordInput onChange={handleChange} />);
      const input = wrapper.find('input');
      input.get(0).value = 'password';
      input.first().simulate('change');
      expect(handleChange.calledOnce).to.equal(true);
    });

  });

  describe('Show Password Button', function() {

    it('should render with a show password button', function() {
      const wrapper = shallow(<PasswordInput showPassword />);
      expect(wrapper.find('div.show-password')).to.have.length(1);
    });

    it('should not render with a show password button', function() {
      const wrapper = shallow(<PasswordInput />);
      expect(wrapper.find('div.show-password')).to.have.length(0);
    });

    it('clicking show password make textbox with "type=text"', function() {
      const wrapper = shallow(<PasswordInput showPassword />);
      wrapper.find('button').simulate('click');
      expect(wrapper.find('input[type="text"]')).to.have.length(1);
    });

    it('clicking show password three times make textbox with "type=text"', function() {
      const wrapper = shallow(<PasswordInput showPassword />);
      const showPasswordBtn = wrapper.find('button');
      showPasswordBtn.simulate('click');
      showPasswordBtn.simulate('click');
      showPasswordBtn.simulate('click');
      expect(wrapper.find('input[type="text"]')).to.have.length(1);
    });

    it('clicking show password twice should again make "type=password"', function() {
      const wrapper = shallow(<PasswordInput showPassword />);
      const showPasswordBtn = wrapper.find('button');
      showPasswordBtn.simulate('doubleClick');
      expect(wrapper.find('input[type="password"]')).to.have.length(1);
    });

  });

  describe('Check Password Validity UI options', function() {

    describe('When list is disabled', function() {

      it('should not display any validity indicator since password field is empty', function() {
        const wrapper = mount(<PasswordInput list={false} uppercase lowercase digits />);
        expect(wrapper.text()).to.be.empty;
      });

      it('should display tick mark when password is correct', function() {
        const wrapper = mount(<PasswordInput list={false} uppercase lowercase digits />);
        const input = wrapper.find('input');
        input.get(0).value = 'Password123';
        input.first().simulate('change');
        expect(wrapper.text()).to.equal('✓');
      });

      it('should display cross mark when password is not valid', function() {
        const wrapper = mount(<PasswordInput list={false} uppercase lowercase digits />);
        const input = wrapper.find('input');
        input.get(0).value = 'password123';
        input.first().simulate('change');
        expect(wrapper.text()).to.equal('✖');
      });

    });

  });

  describe('Checking password validity with different conditions', function() {

    describe('With list enabled', function() {

      describe('For min', function() {

        it('should return empty array - password valid', function() {
          const handleChange = sinon.spy();
          const props = {
            onChange: handleChange,
            min: 6,
          };
          const wrapper = mount(<PasswordInput {...props} />);
          const input = wrapper.find('input');
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return array including "isMin" - password invalid', function() {
          const handleChange = sinon.spy();
          const props = {
            onChange: handleChange,
            min: 12,
          };
          const wrapper = mount(<PasswordInput {...props} />);
          const input = wrapper.find('input');
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('isMin');
        });

      });

      describe('For max', function() {

        it('should return empty array - password valid', function() {
          const handleChange = sinon.spy();
          const props = {
            onChange: handleChange,
            max: 12,
          };
          const wrapper = mount(<PasswordInput {...props} />);
          const input = wrapper.find('input');
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return array including "isMax" - password invalid', function() {
          const handleChange = sinon.spy();
          const props = {
            onChange: handleChange,
            max: 6,
          };
          const wrapper = mount(<PasswordInput {...props} />);
          const input = wrapper.find('input');
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('isMax');
        });

      });

      describe('For Uppercase characters', function() {
        var handleChange;
        var input;

        beforeEach(function() {
          handleChange = sinon.spy();
          const wrapper = mount(
            <PasswordInput
              onChange={handleChange}
              uppercase
              />
          );
          input = wrapper.find('input');
        });

        it('should return an empty array - password valid', function() {
          input.get(0).value = 'Password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;

        });

        it('should return array having "uppercase" - password invalid', function() {
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('uppercase');
        });

      });

      describe('For lowercase characters', function() {
        var handleChange;
        var input;

        beforeEach(function() {
          handleChange = sinon.spy();
          const wrapper = mount(
            <PasswordInput
              onChange={handleChange}
              lowercase
              />
          );
          input = wrapper.find('input');
        });

        it('should return empty array - password valid', function() {
          input.get(0).value = 'PASsWORD123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return array containing "lowercase" - password invalid', function() {
          input.get(0).value = 'PASSWORD123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('lowercase');
        });

      });

      describe('For digits (numerical characters)', function() {
        var handleChange;
        var input;

        beforeEach(function() {
          handleChange = sinon.spy();
          const wrapper = mount(
            <PasswordInput
              onChange={handleChange}
              digits
              />
          );
          input = wrapper.find('input');
        });

        it('should return empty array - password valid', function() {
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return array containing "digits" - password invalid', function() {
          input.get(0).value = 'password';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('digits');
        });

      });

      describe('For noSpaces', function() {
        var handleChange;
        var input;

        beforeEach(function() {
          handleChange = sinon.spy();
          const wrapper = mount(
            <PasswordInput
              onChange={handleChange}
              noSpaces
              />
          );
          input = wrapper.find('input');
        });

        it('should return empty array - password valid', function() {
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return an array having "noSpacess" - password invalid', function() {
          input.get(0).value = 'password 123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('spaces');
        });

      });

      describe('For symbols', function() {
        var handleChange;
        var input;

        beforeEach(function() {
          handleChange = sinon.spy();
          const wrapper = mount(
            <PasswordInput
              onChange={handleChange}
              symbols
              />
          );
          input = wrapper.find('input');
        });

        it('should return empty array - password valid', function() {
          input.get(0).value = 'password@123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.be.an('array').that.is.empty;
        });

        it('should return array having "symobls" - password invalid', function() {
          input.get(0).value = 'password123';
          input.first().simulate('change');
          expect(handleChange.getCall(0).args[0]).to.include('symbols');
        });

      });

    });

    describe('With list disabled', function() {

      describe('For Min', function() {

        it('should return password as valid', function() {
          const handleChange = sinon.spy();
          const props = {
            onChange: handleChange,
            min: 6,
          };
          const wrapper = mount(<PasswordInput list={false} {...props} />);
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
          const wrapper = mount(<PasswordInput list={false} {...props} />);
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
            <PasswordInput list={false}
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
            <PasswordInput
              list={false}
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
            <PasswordInput
              list={false}
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
            <PasswordInput
              list={false}
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
            <PasswordInput
              list={false}
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
            <PasswordInput
              list={false}
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
            <PasswordInput
              list={false}
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

  });

  describe('Checking other props', function() {

    describe('"value" prop', function() {

      it('should render input element with value passed as prop', function() {
        const wrapper = mount(<PasswordInput value="password123" />);
        const value = wrapper.find('input').get(0).value;
        expect(value).to.equal('password123');
      });

    });

  });

});
