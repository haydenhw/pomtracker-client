import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import {
  addTask,
  deleteTask,
  setSelectedProject,
  remoteSubmit,
  updateProjectName,
  updateTasks,
} from '../actions/indexActions';

import { hasAnyValue } from '../helpers/validate';
import { routeToProjectsPage } from '../helpers/route';

import AddOrEditProjectForm from '../components/AddOrEditProjectForm';
import ProjectTaskForm from './ProjectTaskForm';

class EditProjectPage extends Component {
  static defaultProps = {
    projects: [],
  }

  constructor(props) {
    super(props);
    this.handleEditProjectSubmit = this.handleEditProjectSubmit(props.selectedProject);
  }

  componentWillMount() {
    this.props.remoteSubmit(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.remoteSubmitForm === 'ADD_TASKS' && prevProps.remoteSubmitForm === 'ADD_TASKS') {
      this.routeToProjects();
    }
  }

  handleEditProjectSubmit = project => ({ singleInput: projectName }) => {
    const { updateProjectName, updateTasks, remoteSubmit, tasks } = this.props;
    // TODO should I leave a space here?
    if (!hasAnyValue(projectName)) {
      remoteSubmit(null);

      throw new SubmissionError({
        singleInput: 'Project name is required',
      });
    }

    updateProjectName(project, projectName);
    updateTasks(project, tasks);
    remoteSubmit(null);
    this.routeToProjects();
  }

  handleRemoteSubmit = () => {
    this.props.remoteSubmit('ADD_PROJECT');
  }

  routeToProjects = () => {
    routeToProjectsPage(this.props.history);
  }


  render() {
    const { selectedProject } = this.props;
    // TODO should I leave a space here?
    if (!selectedProject) {
      return null;
    }

    return (
      <ProjectTaskForm
        handleCancel={this.routeToProjects}
        handleSubmit={this.handleRemoteSubmit}
        label="Project Name"
        shouldDisableTaskFormFocus
        showTasksForSelectedProject
        title="Edit Project"
      >
        <AddOrEditProjectForm
          formName="projectName"
          initialValues={{ singleInput: selectedProject.projectName }}
          placeholder="Project Name"
          showSubmitButton={false}
          onTargetUpdate={this.handleEditProjectSubmit}
          targetPropKey="remoteSubmitForm"
          targetValue="ADD_PROJECT"
          form={'project form'}
        />
      </ProjectTaskForm>
    );
  }
}
const mapStateToProps = (state) => {
  const { customForm, projects } = state;
  const { remoteSubmitForm, taskForm } = customForm;
  const { selectedProjectId } = projects;
  const { tasks } = taskForm;

  const selectedProject = state.projects.items.length > 0 && selectedProjectId
    ? projects.items.find(project => project.clientId === selectedProjectId)
    : null;

  return {
    projects,
    remoteSubmitForm,
    selectedProjectId,
    selectedProject,
    tasks,
  };
};

export default connect(mapStateToProps, {
  addTask,
  deleteTask,
  setSelectedProject,
  remoteSubmit,
  updateProjectName,
  updateTasks,
})(withRouter(EditProjectPage));

EditProjectPage.propTypes = {
  history: PropTypes.object.isRequired,
  remoteSubmit: PropTypes.func.isRequired,
  remoteSubmitForm: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  selectedProject: PropTypes.object.isRequired,
  updateProjectName: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
};
