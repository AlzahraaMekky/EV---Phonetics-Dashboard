import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import PhoneticsList from './components/PhoneticsList';
import ExampleOfPhonetic from './components/ExampleOfPhonetic';
import Examples from './components/Examples';


import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
    return (
      <Router>
        <div> 
       <SideBar/>
        <div id="content">
          <NavBar/>
          <Routes>
          <Route path="/" element={<PhoneticsList />} /> 
          <Route path="/phoneticsexamples/" element={<Examples />} /> 
          <Route path="/phoneticssexample/:phonetic_name" element={<ExampleOfPhonetic />} /> 
          </Routes>
        </div> 
        </div> 
      </Router>
    );
  }


export default App;
