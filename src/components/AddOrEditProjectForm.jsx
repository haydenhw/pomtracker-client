import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import callOnTargetUpdate from '../hocs/callOnTargetUpdate';

import Input from './Input';

const dummySubmit = (evt) => {
  evt.preventDefault();
  return false;
};

let AddOrEditProjectForm = function AddOrEditProjectForm(props) {
  const {
    childContainerClass,
    fieldAnimationName,
    handleFormSubmit,
    handleSubmit,
    isOnlyInput,
    parentContainerClass,
    showSubmitButton,
    title,
    titleAnimationName,
    titleName,
  } = props;

  return (
    <div className={parentContainerClass}>
      <div className={childContainerClass}>
        <form onSubmit={isOnlyInput ? handleSubmit(handleFormSubmit) : dummySubmit}>
          {title &&
            <h2 className={`form-title ${titleAnimationName || ''}`}>
              {title}
              {titleName && <span className="bold-title">{titleName}</span>}
            </h2>
          }
          <div className={fieldAnimationName || ''}>
            <Field
              component={Input}
              name="singleInput"
              placeholder="Project Name"
              type="text"
              autoFocus
            />
          </div>
        </form>
      </div>
      {showSubmitButton &&
        <button
          className="fade-in-medium-delay
          outline-button
          modal-button-bottom-right"
          onClick={handleSubmit(handleFormSubmit)}
        >
          Continue
        </button>
      }
    </div>
  );
};

const targetInfo = () => {
  return {
    targetValue: 'ADD_PROJECT',
    targetPropKey: 'remoteSubmitForm',
  };
};

const onTargetUpdate = (props) => {
  const { handleSubmit, onTargetUpdate } = props;
  handleSubmit(onTargetUpdate)();
};

AddOrEditProjectForm = callOnTargetUpdate(targetInfo, onTargetUpdate)(AddOrEditProjectForm);

export default reduxForm({
  form: 'singleInput',
})(AddOrEditProjectForm);

AddOrEditProjectForm.propTypes = {
  childContainerClass: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  fieldAnimationName: PropTypes.string,
  parentContainerClass: PropTypes.string,
  isOnlyInput: PropTypes.bool,
  showSubmitButton: PropTypes.bool,
  title: PropTypes.string,
  titleAnimationName: PropTypes.string,
  titleName: PropTypes.string,
};
