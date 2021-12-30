import './App.css';
import {
  BrowserRouter as Router,
  Routes,
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
import AdminRoute from './Pages/AdminRoute/AdminRoute';
import NotFound from './Pages/NotFound/NotFound';
import MyWishLists from './Pages/MyWishLists/MyWishLists';
import Payment from './Pages/Payment/Payment';
import Success from './Pages/Success/Success';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>

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
              <Route path="" element={<AdminRoute><ManageAllBookings /></AdminRoute>}/>
              <Route path="manageAllBookings" element={<AdminRoute><ManageAllBookings/></AdminRoute>} />
              <Route path="adminAllDestinations" element={<AdminAllDestination/>} />
              <Route path="addNewDestination" element={<AddNewDestination/>} />
              <Route path="makeAdmin" element={<MakeAdmin/>} />
            </Route>

            

            <Route path="*" element={ <NotFound/>}/>

          </Routes>
          <Footer></Footer>
        </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
