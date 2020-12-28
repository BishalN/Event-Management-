import axios from 'axios';

import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
} from '../constants/eventConstants';

export const createEvent = (event) => async (dispatch) => {
  const { title, price, description, date } = event;
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: { 'Content-Type': 'application/json' },
      data: {
        query: `
            mutation {
              createEvent(eventInput:{title:"${title}",price:"${price}",description:"${description}",date:"${date}"}){
                _id,
                title,
                description,
                creator,
                price,
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
