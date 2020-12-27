import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';

const AuthPage = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    let requestBody = {
      query: `
        query {
          login(email:"${emailAddress}",password:"${password}"){
            userId,
            token,
            tokenExpiration
          }
        }
      `,
    };

    if (!isLogin) {
      requestBody = {
        query: ` mutation {createUser(userInput:{email:"${emailAddress}",password:"${password}"}){_id email
          }
        }
        `,
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
