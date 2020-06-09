import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './Input';
import List from './List';

const AddTasksForm = (props) => {
  const {
    childContainerClass,
    fieldAnimationName,
    formTasks,
    handleSubmit,
    handleFormSubmit,
    handleTaskSubmit,
    parentContainerClass,
    renderFormTask,
    showSubmitButton,
    autoFocus,
    submitButtonText,
    submitButtonClass,
    title,
    titleAnimationName,
    titleName
  } = props;

  return (
    <div className={parentContainerClass}>
      <div className={childContainerClass}>
        {title &&
          <h2 className={`form-title ${titleAnimationName}`}>
            {title}
            {titleName && <span className="bold-title">{titleName}</span>}
          </h2>
        }
        <div className={`form-field-wrapper ${fieldAnimationName}`}>
          <label htmlFor="taskName">Tasks</label>
          <List className="task-list" items={formTasks} renderItem={renderFormTask} />
          <form autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
            <Field
              component={Input}
              name="taskName"
              placeholder="Add Tasks"
              autoFocus={autoFocus}
            />
          </form>
        </div>
      </div>
      {!(showSubmitButton === false) &&
        <button
          className={submitButtonClass}
          onClick={handleSubmit(handleFormSubmit)}
        >
          {submitButtonText || 'Finish'}
        </button>
      }
    </div>
  );
};

export default AddTasksForm;

AddTasksForm.propTypes = {
  childContainerClass: PropTypes.string,
  fieldAnimationName: PropTypes.string,
  formTasks: PropTypes.array.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTaskSubmit: PropTypes.func.isRequired,
  parentContainerClass: PropTypes.string,
  renderFormTask: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  showSubmitButton: PropTypes.bool,
  submitButtonClass: PropTypes.string,
  submitButtonText: PropTypes.string,
  title: PropTypes.string,
  titleAnimationName: PropTypes.string,
  titleName: PropTypes.string,
};
