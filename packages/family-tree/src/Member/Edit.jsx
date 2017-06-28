import React, { Component, PropTypes } from 'react';

import NameInput from '../Inputs/Name';
import CancelButton from '../Buttons/Cancel';
import SaveButton from '../Buttons/Save';

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
        <NameInput
          name="name"
          type="text"
          defaultValue={this.props.name}
          ref={this.assignRef('name')}
        />
        <CancelButton
          name="cancel"
          onClick={this.props.onCancel}
        />
        <SaveButton
          name="save"
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
