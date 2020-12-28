import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
} from '../constants/eventConstants';

export const createEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true };
    case CREATE_EVENT_SUCCESS:
      return { loading: false, event: action.payload };
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
