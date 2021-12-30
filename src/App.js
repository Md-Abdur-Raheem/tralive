import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import AdminRoute from './Pages/AdminRoute/AdminRoute';
import Header from './Pages/Shared/Header/Header';
import Footer from './Pages/Shared/Footer/Footer';



/* import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AllDestinations from './Pages/AllDestinations/AllDestinations';
import Contact from './Pages/Contact/Contact';
import AddNewDestination from './Pages/AddNewDestination/AddNewDestination';
import BookingDestination from './Pages/BookigDestination/BookingDestination';
import MyBookings from './Pages/MyBookings/MyBookings';
import ManageAllBookings from './Pages/ManageAllBookings/ManageAllBookings';
import AdminAllDestination from './Pages/AdminAllDestinations/AdminAllDestination';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import MakeAdmin from './Pages/MakeAdmin/MakeAdmin';
import NotFound from './Pages/NotFound/NotFound';
import MyWishLists from './Pages/MyWishLists/MyWishLists';
import Payment from './Pages/Payment/Payment';
import Success from './Pages/Success/Success'; */


const Home = React.lazy(() => import('./Pages/Home/Home'));
const AllDestinations = React.lazy(() => import('./Pages/AllDestinations/AllDestinations'));
const Contact = React.lazy(() => import('./Pages/Contact/Contact'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));
const Payment = React.lazy(() => import('./Pages/Payment/Payment'));
const BookingDestination = React.lazy(() => import('./Pages/BookigDestination/BookingDestination'));
const MyBookings = React.lazy(() => import('./Pages/MyBookings/MyBookings'));
const MyWishLists = React.lazy(() => import('./Pages/MyWishLists/MyWishLists'));
const Success = React.lazy(() => import('./Pages/Success/Success'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'));
const ManageAllBookings = React.lazy(() => import('./Pages/ManageAllBookings/ManageAllBookings'));
const AdminAllDestination = React.lazy(() => import('./Pages/AdminAllDestinations/AdminAllDestination'));
const AddNewDestination = React.lazy(() => import('./Pages/AddNewDestination/AddNewDestination'));
const MakeAdmin = React.lazy(() => import('./Pages/MakeAdmin/MakeAdmin'));
const NotFound = React.lazy(() => import('./Pages/NotFound/NotFound'));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>

          <React.Suspense fallback={
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>}>
          <Routes>
            
              <Route path="/" element={ <Home/> }/>

              <Route path="/home" element={ <Home/>}/>

              <Route path="/allDestinations" element={ <AllDestinations/> }/>

              <Route path="/contact" element={ <Contact/>}/>

              <Route path="/login" element={ <Login/> }/>

              <Route path="/register" element={<Register />} />

              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />

              <Route path="/bookingDestination/:id" element={ <PrivateRoute><BookingDestination/></PrivateRoute> }/>

              <Route path="/myBookings" element={ <PrivateRoute><MyBookings/></PrivateRoute>}/>

              <Route path="/myWishLists" element={<PrivateRoute><MyWishLists /></PrivateRoute>} />

              <Route path="/success" element={ <PrivateRoute><Success/></PrivateRoute>}/>

              <Route path="/dashboard/*" element={<AdminRoute><Dashboard /></AdminRoute>}>
                <Route path="" element={<AdminRoute><ManageAllBookings /></AdminRoute>} />
                
                <Route path="manageAllBookings" element={<AdminRoute><ManageAllBookings /></AdminRoute>} />
                
                <Route path="adminAllDestinations" element={<AdminRoute><AdminAllDestination /></AdminRoute>} />
                
                <Route path="addNewDestination" element={<AdminRoute><AddNewDestination /></AdminRoute>} />
                
                <Route path="makeAdmin" element={<AdminRoute><MakeAdmin/></AdminRoute>} />
              </Route>

              <Route path="*" element={ <NotFound/>}/>

          </Routes>
          </React.Suspense>
          <Footer></Footer>
        </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
