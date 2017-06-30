import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';

import { updateProject } from '../actions/indexActions';

let EditProjectForm = class extends Component {
  componentWillMount() {
    const { selectedProject } = this.props;
    
    if (!selectedProject) {
    //  hashHistory.push('/projects'); 
    }
    }
    
  render() {
    const { handleSubmit, project, updateProject } = this.props;
    const handleEditProjectSubmit = ({ projectName }) => {
      
      updateProject(project, projectName);
    }
    
    return (
      <form onSubmit={handleSubmit(handleEditProjectSubmit)}>
        <div>
          <label>Project Name</label>
          <div>
            <Field
              name="projectName"
              component="input"
              type="text"
              placeholder="Project Name"
            />
          </div>
        </div>
      </form>
    );
  }
};

EditProjectForm = reduxForm({
  form: 'EditProjectForm', // a unique identifier for this form
})(EditProjectForm);

EditProjectForm = connect(
  state => {
    const { selectedProjectId, projects } = state;
    
    const selectedProject = projects.items.find((project) => project.shortId === selectedProjectId); 
    const projectName = (projects.items.length > 0 && selectedProjectId) && selectedProject.projectName;
    
    return ({
      selectedProjectId, 
      initialValues: { projectName: /*'tester'*/ projectName }, 
      project: selectedProject
    })
  }, { updateProject})(EditProjectForm);

export default EditProjectForm;