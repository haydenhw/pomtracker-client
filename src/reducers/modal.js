import * as actions from '../actions/indexActions';

import { modalType, renderFormModal } from '../config/devSettings';

const defaultState = {
  modalType,
  isOnboardingActive: false,
  showModal: renderFormModal,
  isModalClosing: false,
  modalProps: null,
};

export default function modal(state = defaultState, action) {
  switch (action.type) {
    case actions.ADD_MODAL_CLOSING_CLASS:
      return {
        ...state,
        isModalClosing: true,
      };
    case actions.CHANGE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType,
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        isModalClosing: false,
        isOnboardingActive: false,
      };
    case actions.CONFIRM_DELETE_PROJECT:
      return {
        ...state,
        showModal: true,
        modalType: 'CONFIRM_DELETE_PROJECT',
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_DELETE_TASK:
      return {
        ...state,
        showModal: true,
        modalType: 'CONFIRM_DELETE_TASK',
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_EDIT_TASK:
      return {
        ...state,
        showModal: true,
        modalType: 'CONFIRM_EDIT_TASK',
        modalProps: action.modalProps,
      };
    case actions.TOGGLE_ADD_TASKS_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        modalType: 'ADD_TASKS',
      };
    case actions.TOGGLE_EDIT_TASK_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: 'EDIT_TASK',
      };
    case actions.TOGGLE_CONFIG:
      return {
        ...state,
        showModal: true,
        modalType: 'CONFIG',
      };
    case actions.TOGGLE_ONBOARD_MODE:
      return {
        ...state,
        showModal: !state.showModal,
        isModalClosing: false,
        isOnboardingActive: !state.isOnboardingActive,
      };
    case actions.TOGGLE_PROJECT_NAG_MODAL:
      return {
        ...state,
        showModal: true,
        modalProps: action.modalProps,
        modalType: 'PROJECT_NAG',
      };
    case actions.UPDATE_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.modalProps,
      };
    default:
      return state;
  }
}
