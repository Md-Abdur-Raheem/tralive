import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Login/Login';
import AuthProvider from './context/AuthProvider';
import AllDestinations from './Pages/AllDestinations/AllDestinations';
import Footer from './Pages/Shared/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import AddNewDestination from './Pages/AddNewDestination/AddNewDestination';
import BookingDestination from './Pages/BookigDestination/BookingDestination';
import MyBookings from './Pages/MyBookings/MyBookings';
import ManageAllBookings from './Pages/ManageAllBookings/ManageAllBookings';
import AdminAllDestination from './Pages/AdminAllDestinations/AdminAllDestination';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import MakeAdmin from './Pages/MakeAdmin/MakeAdmin';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>

          <Switch>
            
            <Route exact path="/">
            <Home></Home>
            </Route>

            <Route path="/home">
            <Home></Home>
            </Route>

            <Route path="/allDestinations">
            <AllDestinations></AllDestinations>
            </Route>


            <Route path="/contact">
            <Contact></Contact>
            </Route>

            <Route path="/login">
            <Login></Login>
            </Route>

            <Route path="/register">
            <Register></Register>
            </Route>

            <PrivateRoute path="/addNewDestination">
              <AddNewDestination></AddNewDestination>
            </PrivateRoute>
            
            <PrivateRoute path="/bookingDestination/:id">
              <BookingDestination></BookingDestination>
            </PrivateRoute>

            <PrivateRoute path="/myBookings">
              <MyBookings></MyBookings>
            </PrivateRoute>

            <PrivateRoute path="/manageAllBookings">
              <ManageAllBookings></ManageAllBookings>
            </PrivateRoute>

            <PrivateRoute path="/adminAllDestinations">
              <AdminAllDestination></AdminAllDestination>
            </PrivateRoute>

            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>

            <PrivateRoute path="/makeAdmin">
              <MakeAdmin></MakeAdmin>
            </PrivateRoute>

          </Switch>
          <Footer></Footer>
        </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
