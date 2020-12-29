import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import { login, register } from '../actions/auth';

const AuthPage = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      return dispatch(register(emailAddress, password));
    }
    dispatch(login(emailAddress, password));
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler} className='mt-5'>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
        <Button className='ml-4' onClick={() => setIsLogin(!isLogin)}>
          Switch To {isLogin ? 'Sign Up' : 'Login'}
        </Button>
        <span className='ml-4'>
          You are in {isLogin ? 'Login mode' : 'Sign up Mode'}
        </span>
      </Form>
    </FormContainer>
  );
};

export default AuthPage;
