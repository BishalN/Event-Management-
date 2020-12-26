import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingPage from './pages/Booking';
import EventPage from './pages/Event';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from='/' to='/auth' exact></Redirect>
        <Route path='/auth' component={AuthPage}></Route>
        <Route path='/events' component={EventPage}></Route>
        <Route path='/bookings' component={BookingPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
