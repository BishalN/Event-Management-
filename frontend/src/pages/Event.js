import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createEvent, getEvents } from '../actions/events';
import EventItemCard from '../components/EventItemCard';

const EventPage = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createEvents = useSelector((state) => state.createEvent);
  const { event: createdEvent } = createEvents;

  const getEventsFromStore = useSelector((state) => state.getEvents);
  const { events: fetchedEvents } = getEventsFromStore;

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
          <EventItemCard
            event={event}
            isCreator={
              userInfo && event.creator._id === userInfo.data.login.userId
            }
          />
        ))}
      </Row>
    </>
  );
};

export default EventPage;
