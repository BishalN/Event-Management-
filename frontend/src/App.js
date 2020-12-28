import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthPage from './pages/Auth';
import BookingPage from './pages/Booking';
import EventPage from './pages/Event';
import Header from './components/Header';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/events' component={EventPage}></Route>
        <Route path='/auth' component={AuthPage}></Route>
        {userInfo && <Redirect from='/auth' to='/events'></Redirect>}
        {userInfo && <Route path='/bookings' component={BookingPage}></Route>}
        {!userInfo && <Redirect to='/auth' exact></Redirect>}
        {userInfo && <Redirect from='/' to='/events'></Redirect>}
      </Switch>
    </Router>
  );
}

export default App;
