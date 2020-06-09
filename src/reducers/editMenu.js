import * as actions from '../actions/indexActions';

const defaultState = {
  activeParentId: null,
  clickedTaskId: null,
};

export default function editMenu(state = defaultState, action) {
  switch (action.type) {
    case actions.CHANGE_ACTIVE_EDIT_MENU:
      return {
        ...state,
        activeParentId: action.parentId,
      };
    case actions.TOGGLE_EDIT_TASK_MODAL:
      return {
        ...state,
        clickedTaskId: action.taskId,
      };
    default:
      return state;
  }
}
