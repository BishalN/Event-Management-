import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { userLoginReducer, userRegisterReducer } from './reducers/auth';
import {
  createEventReducer,
  getEventsReducer,
  getBookingsReducer,
  bookEventReducer,
  cancelBookingReducer,
} from './reducers/events';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createEvent: createEventReducer,
  getEvents: getEventsReducer,
  bookEvent: bookEventReducer,
  getBookings: getBookingsReducer,
  cancelBooking: cancelBookingReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
