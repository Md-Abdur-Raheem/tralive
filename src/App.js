import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Login/Login';
import Footer from './Pages/Shared/Header/Footer/Footer';
import AuthProvider from './context/AuthProvider';

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
