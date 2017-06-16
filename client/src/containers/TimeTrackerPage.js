import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTask, decrementTimer, fetchProjects, setActiveProject } from '../actions/indexActions';


import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {

render() {
  const { activeProjectId, decrementTimer, deleteTask, projects, setActiveProject } = this.props;
  const activeProjectIndex = activeProjectId && projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = !isNaN(activeProjectIndex) && projects[activeProjectIndex];
  const selectedTasks = activeProject && activeProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        activeProject={activeProject || null}
        decrementTimer={decrementTimer}
        deleteTask={deleteTask}
        projects={projects}
        setActiveProject={setActiveProject}
        tasks={selectedTasks || []}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { activeProjectId, projects } = state;
  
  return {
    activeProjectId,
    projects
  }
}

export default connect(mapStateToProps, {
  deleteTask,
  fetchProjects,
  decrementTimer,
  setActiveProject,
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
