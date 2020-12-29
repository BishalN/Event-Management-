import axios from 'axios';

import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
} from '../constants/eventConstants';

export const createEvent = (event) => async (dispatch, getState) => {
  const { title, price, description, date } = event;

  const {
    userLogin: { userInfo },
  } = getState();

  console.log(userInfo.data.login.token);
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
