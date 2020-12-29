import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { bookEvent } from '../actions/events';
const EventItemCard = ({ event }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookEvents = useSelector((state) => state.bookEvent);
  const { success } = bookEvents;

  const bookingHandler = (eventId) => {
    console.log(eventId);
    dispatch(bookEvent(eventId));
  };
  return (
    <>
      {success && <Alert variant='success'>Successfully booked event</Alert>}
      <Card border='primary' style={{ width: '18rem', margin: '5px' }}>
        <Card.Header>{event.title}</Card.Header>
        <Card.Body>
          <Card.Title>{event.description}</Card.Title>
          <Card.Text>{event.date}</Card.Text>
          <Card.Text>${event.price}</Card.Text>
        </Card.Body>
        {userInfo && (
          <Button className='m-3' onClick={() => bookingHandler(event._id)}>
            Book this event
          </Button>
        )}
      </Card>
    </>
  );
};

export default EventItemCard;
