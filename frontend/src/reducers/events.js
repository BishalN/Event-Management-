import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  BOOK_EVENT_FAIL,
  BOOK_EVENT_REQUEST,
  BOOK_EVENT_SUCCESS,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  CANCEL_BOOKING_FAIL,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
} from '../constants/eventConstants';

export const createEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true };
    case CREATE_EVENT_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return { loading: true };
    case GET_EVENT_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookEventReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_EVENT_REQUEST:
      return { loading: true };
    case BOOK_EVENT_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOK_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOKINGS_REQUEST:
      return { loading: true };
    case GET_BOOKINGS_SUCCESS:
      return { loading: false, bookings: action.payload };
    case GET_BOOKINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_BOOKING_REQUEST:
      return { loading: true };
    case CANCEL_BOOKING_SUCCESS:
      return { loading: false, success: true };
    case CANCEL_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
