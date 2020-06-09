import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Notification from 'react-web-notification';

import { routeToProjectsPage, routeToTimerPage } from '../helpers/route';
import { changeActiveLink, fetchProjects, handleExistingUserVisit, handleNewUserVisit, toggleProjectNagModal } from '../actions/indexActions';
import { doesUserExist, isJWTExpired, getUser, getJWT, clearUser, clearJWT, createNewUser, getUserId } from 'helpers/users';

import AddProjectPage from './AddProjectPage';
import EditProjectPage from './EditProjectPage';
import ProjectsPage from './ProjectsPage';
import TimerPage from './TimerPage';
import Nav from '../components/Nav';


class App extends Component {
  constructor() {
    super();

    this.state = {
      showNotification: true,
    };
  }

  componentDidMount() {
    const { fetchProjects, handleNewUserVisit, handleExistingUserVisit } = this.props;
    const jwt = getJWT();
    const user = getUser();
    let userId = getUserId();

    if (userId) {
       fetchProjects(userId);
    } else {
      userId = createNewUser();
      fetchProjects(userId);
    }

    // This logic is being saved for when jwt auth is re-enabled
    // doesUserExist()
    //   ? handleExistingUserVisit(jwt, user)
    //   : handleNewUserVisit();
  }

  handleProjectsLinkClick = () =>  {
      routeToProjectsPage(this.props.history)
  }

  handleTimerLinkClick = () =>  {
    const { history, projects, toggleProjectNagModal } = this.props;
    projects.length ? routeToTimerPage(history) : toggleProjectNagModal();
  }

  render() {
    const { hasFetched, isDesktopNotificationActive, location } = this.props;
    const { pathname } = location;
    const isProjectRoute = /projects/.test(pathname);

    return (
      <div>
        <Nav
          activeLink={isProjectRoute ? 'PROJECTS' : 'TIMER'}
          onTimerLinkClick={this.handleTimerLinkClick}
          onProjectsLinkClick={this.handleProjectsLinkClick }
          isProjectRoute={isProjectRoute}
        />
        {!hasFetched ? (
          <div className="loader">Loading...</div>
        ) : (
          <Switch>
            <Route path={'/app/new-project'}>
              <AddProjectPage />
            </Route>
            <Route path={'/app/edit-project/:id'}>
              <EditProjectPage />
            </Route>
            <Route path={'/app/projects'}>
              <ProjectsPage />
            </Route>
            <Route path={'/app/timer'}>
              <TimerPage />
            </Route>
          </Switch>
        )}

        {isDesktopNotificationActive && (
          <Notification
            title="Time's Up!"
            ignore={false}
            options={{ icon: 'images/tomato-timer.png' }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { projects, timer } = state;
  const { hasFetched } = projects;
  const { isDesktopNotificationActive } = timer;

  return {
    hasFetched,
    isDesktopNotificationActive,
    projects: projects.items,
  };
};

export default connect(mapStateToProps, {
  changeActiveLink,
  fetchProjects,
  toggleProjectNagModal,
  handleExistingUserVisit,
  handleNewUserVisit,
},
)(withRouter(App));

App.propTypes = {
  hasFetched: PropTypes.bool.isRequired,
  isDesktopNotificationActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  toggleProjectNagModal: PropTypes.func.isRequired,
};
