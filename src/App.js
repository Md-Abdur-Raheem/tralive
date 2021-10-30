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

          </Switch>
          <Footer></Footer>
        </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
