import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import PhoneticsList from './components/PhoneticsList';
import ExampleOfPhonetic from './components/ExampleOfPhonetic';
import Examples from './components/Examples';
import Quiz_1 from './components/Quiz_1';
import QuizOnePhonetics from './components/QuizOnePhonetics';


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
            <Route path="/quiz-One/:phonetic_name" element={<QuizOnePhonetics/>} /> 
            <Route path="/quiz-One" element={<Quiz_1 />} /> 
          </Routes>
        </div> 
        </div> 
      </Router>
    );
  }


export default App;
