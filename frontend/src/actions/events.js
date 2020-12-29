import axios from 'axios';

import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_FAIL,
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

export const createEvent = (event) => async (dispatch, getState) => {
  const { title, price, description, date } = event;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.data.login.token,
      },
      data: {
        query: `
            mutation {
              createEvent(eventInput:{title:"${title}",price:${price},description:"${description}",date:"${date}"}){
                _id
                title
                description
                creator {
                  _id
                  email
                }
                price
                date
              }
            }
          `,
      },
    });

    dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_EVENT_FAIL, payload: error });
  }
};

export const getEvents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EVENT_REQUEST });

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      data: {
        query: `
            query {
              events{
                _id
                title
                description
                creator {
                  _id
                  email
                }
                price
                date
              }
            }
          `,
      },
    });

    dispatch({ type: GET_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_EVENT_FAIL, payload: error });
  }
};

export const bookEvent = (eventId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_EVENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: {
        Authorization: 'Bearer ' + userInfo.data.login.token,
      },
      data: {
        query: `
        mutation {
          bookEvent(eventId:"${eventId}"){
            _id
            event{title,description}
            createdAt
          }
        }
        `,
      },
    });

    dispatch({ type: BOOK_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_EVENT_FAIL, payload: error });
  }
};

export const getBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BOOKINGS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: {
        Authorization: 'Bearer ' + userInfo.data.login.token,
      },
      data: {
        query: `
        query {
          bookings {
            _id
            createdAt
          }
        }
          `,
      },
    });

    dispatch({ type: GET_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_BOOKINGS_FAIL, payload: error });
  }
};

export const cancelBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_BOOKING_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: {
        Authorization: 'Bearer ' + userInfo.data.login.token,
      },
      data: {
        query: `
        mutation {
          cancelBooking(bookingId:"${bookingId}"){
            _id
          }
        }
          `,
      },
    });

    dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CANCEL_BOOKING_FAIL, payload: error });
  }
};
