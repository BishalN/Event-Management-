import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EventPage = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eventSubmitHandler = (e) => {
    e.preventDefault();
    setPrice(parseFloat(price));
    const event = { title, price, description, date };
    console.log(event);
  };
  return (
    <>
      <Button variant='primary' onClick={handleShow} style={{ margin: '20px' }}>
        Launch static backdrop modal
      </Button>

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
                onChange={(e) => setPrice(e.target.value)}
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
    </>
  );
};

export default EventPage;
