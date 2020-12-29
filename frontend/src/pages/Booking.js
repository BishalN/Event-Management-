import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getBookings, cancelBooking } from '../actions/events';
import Loader from '../components/Loader';
import Messages from '../components/Messages';

const BookingPage = () => {
  const dispatch = useDispatch();
  const getBookingsFromStore = useSelector((state) => state.getBookings);
  const { loading, bookings: bookingsFromStore, error } = getBookingsFromStore;

  const [bookings, setBookings] = useState([]);
  console.log(bookings);

  useEffect(() => {
    if (!bookingsFromStore) {
      dispatch(getBookings());
    }
    if (bookingsFromStore) {
      setBookings([...bookingsFromStore.data.bookings]);
    }
  }, [bookingsFromStore, dispatch]);

  const cancelBookingHandler = (id) => {
    dispatch(cancelBooking(id));
    dispatch(getBookings());
  };
  return (
    <Container>
      {loading && <Loader />}
      {error && <Messages variant='danger'>{error.message}</Messages>}
      <Row sm={12} md={6} xl={4} className='m-2'>
        {bookings.map((booking) => (
          <Card
            className='mt-3'
            border='primary'
            style={{ width: '18rem', margin: '5px' }}
          >
            <Card.Header>{booking.createdAt}</Card.Header>
            <Button
              variant='danger'
              className='m-3'
              onClick={() => cancelBookingHandler(booking._id)}
            >
              Cancel Booking
            </Button>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default BookingPage;
