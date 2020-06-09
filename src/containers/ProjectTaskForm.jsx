import React from 'react';
import PropTypes from 'prop-types';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';

export default function ProjectTaskForm(props) {
  const {
    children,
    handleSubmit,
    handleCancel,
    label,
    selectedProjectName,
    showTasksForSelectedProject,
    title,
  } = props;

  return (
    <div className="form-page fullscreen-container">
      <div className="form-container">
        <h2
          className="form-title"
        >
          {title}
          <span className="bold-title">{selectedProjectName}</span>
        </h2>
        {label && <label htmlFor={label}>{label}</label>}
        {children}
        <AddTasksFormContainer
          formType="FORM_PAGE"
          shouldDisableFocusOnMount
          showSubmitButton={false}
          showTasksForSelectedProject={showTasksForSelectedProject}
        />
        <div className="form-page-button-group">
          <button className="form-page-button outline-button" onClick={handleCancel}>Cancel</button>
          <button className="form-page-button outline-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

ProjectTaskForm.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  label: PropTypes.string,
  selectedProjectName: PropTypes.string,
  showTasksForSelectedProject: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
