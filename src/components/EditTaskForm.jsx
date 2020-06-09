import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Input from './Input';

let EditTaskForm = function(props) {
  const { containerClass, handleEditTaskSubmit, handleSubmit, initialValues } = props;

  return (
    <div className="bounce-in-down">
      <div className={`form-container ${containerClass || ''}`}>
        <h2 className="form-title">Edit Task</h2>
        <form className="form" onSubmit={handleSubmit(handleEditTaskSubmit)}>
          <div className="form-field-wrapper">
            <label htmlFor="task name">Task Name</label>
            <Field
              name="taskName"
              component={Input}
              autoFocus
              type="text"
            />
          </div>
          <div className="form-field-wrapper">
            <label htmlFor="loged time">Logged Time: {initialValues.recordedTime}</label>
            <Field
              name="newTime"
              component={Input}
              type="text"
            />
          </div>
        </form>
      </div>

      <button
        className="fade-in-medium-delay outline-button modal-button-bottom-right"
        onClick={handleSubmit(handleEditTaskSubmit)}
        type="submit"
      >
          Submit
      </button>
    </div>
  );
};

EditTaskForm = reduxForm({
  form: 'EditTaskForm',
})(EditTaskForm);

export default EditTaskForm;

EditTaskForm.propTypes = {
  containerClass: PropTypes.string,
  handleEditTaskSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};
