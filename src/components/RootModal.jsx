import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';

import store from '../redux-files/store';

export default class RootModal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  // use componentWillUpdate if not using redux
  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    const { children, className } = this.props;

    ReactDOM.render(
      <Provider store={store}>
        <div className={` ${className} modal-container`}>
          <div className="modal-background">
            {children}
          </div>
        </div>
      </Provider>,
      this.modalTarget,
    );
  }

  render() {
    return <noscript />;
  }
}

RootModal.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};
