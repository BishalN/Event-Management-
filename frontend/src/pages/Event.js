import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createEvent, getEvents, bookEvent } from '../actions/events';
import Messages from '../components/Messages';

const EventPage = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createEvents = useSelector((state) => state.createEvent);
  const { event: createdEvent } = createEvents;

  const getEventsFromStore = useSelector((state) => state.getEvents);
  const { events: fetchedEvents } = getEventsFromStore;

  const bookEvents = useSelector((state) => state.bookEvent);
  const { success } = bookEvents;

  const bookingHandler = (eventId) => {
    dispatch(bookEvent(eventId));
  };

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState();
  const [events, setEvents] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!fetchedEvents) {
      dispatch(getEvents());
    }
    if (fetchedEvents) {
      setEvents([...fetchedEvents.data.events]);
    }
  }, [dispatch, fetchedEvents, createdEvent]);

  const eventSubmitHandler = (e) => {
    e.preventDefault();
    const event = { title, price, description, date };
    console.log(event);
    dispatch(createEvent(event));
    dispatch(getEvents());
  };
  return (
    <>
      {userInfo && (
        <Button
          variant='primary'
          onClick={handleShow}
          style={{ margin: '20px' }}
        >
          Create an Event
        </Button>
      )}

      {success && (
        <Container>
          <Messages variant='success'>Event booked successfully</Messages>
        </Container>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Your Own Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={eventSubmitHandler}>
            <Form.Group controlId='formBasicTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter the price for attending your event'
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='datetime-local'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Describe your event briefly'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              onClick={eventSubmitHandler}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Row sm={12} md={6} xl={4} className='m-2'>
        {events.map((event) => (
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
        ))}
      </Row>
    </>
  );
};

export default EventPage;
