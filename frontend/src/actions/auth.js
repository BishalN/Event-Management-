import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/authConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: { 'Content-Type': 'application/json' },
      data: {
        query: `
        query {
          login(email:"${email}",password:"${password}"){
            userId,
            token,
            tokenExpiration
          }
        }
      `,
      },
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios({
      method: 'POST',
      url: 'http://localhost:8000/graphql',
      headers: { 'Content-Type': 'application/json' },
      data: {
        query: ` mutation {createUser(userInput:{email:"${email}",password:"${password}"}){_id email
            }
          }
          `,
      },
    });

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
