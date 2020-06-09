import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';

import { postProject, remoteSubmit } from '../actions/indexActions';
import { hasAnyValue, isDuplicate } from '../helpers/validate';
import { routeToProjectsPage } from '../helpers/route';

import AddOrEditProjectForm from '../components/AddOrEditProjectForm';
import ModalController from './ModalController';
import ProjectTaskForm from './ProjectTaskForm';

let AddProjectPage = class extends Component {
  routeToProjects = () => {
    routeToProjectsPage(this.props.history)
  }

  handleNewProjectSubmit = ({ singleInput: projectName }) => {
    const { newTasks, postProject, projects, remoteSubmit } = this.props;
    const projectNames = projects.items.map(project => project.projectName);

    if (!hasAnyValue(projectName)) {
      remoteSubmit(null);

      throw new SubmissionError({
        singleInput: 'Project name is required',
      });
    }

    if (isDuplicate(projectName, projectNames)) {
      throw new SubmissionError({
        singleInput: `A project with the name '${projectName}' already exists`,
      });
    }

    postProject(projectName, newTasks);
    remoteSubmit(null);
    this.routeToProjects();
  }


  handleRemoteSubmit = () => {
    this.props.remoteSubmit('ADD_PROJECT');
  }

  render() {
    const { isModalClosing } = this.props;
    return (
      <div>
        <ProjectTaskForm
          handleCancel={this.routeToProjects}
          handleSubmit={this.handleRemoteSubmit}
          label="Project Name"
          title="New Project"
        >
          <AddOrEditProjectForm
            formName="projectName"
            placeholder="Project Name"
            showSubmitButton={false}
            onTargetUpdate={this.handleNewProjectSubmit}
            targetValue="ADD_PROJECT"
            targetPropKey="remoteSubmitForm"
          />
        </ProjectTaskForm>
        <ModalController rootModalClass={`roadrunner ${isModalClosing ? 'out' : ''}`} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { customForm, modal, projects } = state;
  const { isModalClosing } = modal;
  const { taskForm } = customForm;
  const { tasks: newTasks } = taskForm;

  return {
    isModalClosing,
    newTasks,
    projects,
  };
};

export default AddProjectPage = connect(mapStateToProps, {
  postProject,
  remoteSubmit,
})(withRouter(AddProjectPage));

AddProjectPage.propTypes = {
  newTasks: PropTypes.array,
  postProject: PropTypes.func,
  projects: PropTypes.array,
  isModalClosing: PropTypes.bool,
  remoteSubmit: PropTypes.func,
};
