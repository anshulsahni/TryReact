import React, { Component, PropTypes } from 'react';

class Edit extends Component {

  getValue() {
    return {
      id: this.props.id,
      name: this.name.value,
    };
  }

  assignRef(refName) {
    return (ref) => {
      this[refName] = ref;
    };
  }

  render() {
    return (
      <div className="edit">
        <input
          name="name"
          type="text"
          defaultValue={this.props.name}
          ref={this.assignRef('name')}
        />
        <input
          name="cancel"
          type="button"
          value="Cancel"
          onClick={this.props.onCancel}
        />
        <input
          name="save"
          type="button"
          value="Save"
          onClick={this.props.onSave}
        />
      </div>
    );
  }
}

Edit.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  name: PropTypes.string,

};

Edit.defaultProps = {
  name: '',
};

export default Edit;
