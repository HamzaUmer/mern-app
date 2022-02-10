import React, { createContext, useReducer } from 'react';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Error from './components/ErrorPage';
import { initialState, reducer } from './reducers/UseReducer';

//1: Context API
export const UserContext = createContext();

const Routing = () => {
  return(
    <Routes>
    <Route path = "/" exact element={<Home/>}/>
    <Route path = "/about" element={<About/>}/>
    <Route path = "/contact" element={<Contact/>}/>
    <Route path = "/login" element={<Login/>}/>
    <Route path = "/registration" element={<Register/>}/>
    <Route path = "/logout" element={<Logout/>}/>
    <Route path="*" element={<Error/>}/>
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <div>
     <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
     <Routing />
     </UserContext.Provider>
    </div>
  )
}

export default App;
