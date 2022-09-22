import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import PhoneticsList from './components/PhoneticsList';
import ExampleOfPhonetic from './components/ExampleOfPhonetic';
import Examples from './components/Examples';
import Quiz_1 from './components/Quiz_1';
import Quiz_2 from './components/Quiz_2';
import Quiz_3 from './components/Quiz_3';
import QuizOnePhonetics from './components/QuizOnePhonetics';
import QuiztwoPhonetics from './components/QuiztwoPhonetics';
import QuizthreePhonetics from './components/QuizthreePhonetics';

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
            <Route path="/quiz-two/:phonetic_name" element={<QuiztwoPhonetics/>} /> 
            <Route path="/quiz-Three/:phonetic_name" element={<QuizthreePhonetics/>} /> 
            <Route path="/quiz-One" element={<Quiz_1 />} /> 
            <Route path="/quiz-two" element={<Quiz_2 />} /> 
            <Route path="/quiz-Three" element={<Quiz_3 />} /> 
          </Routes>
        </div> 
        </div> 
      </Router>
    );
  }


export default App;
