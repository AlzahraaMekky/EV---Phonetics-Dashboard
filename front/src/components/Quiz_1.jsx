import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LettersList4Quiz1 from "./LettersList4Quiz1";


function Quiz_1() {
  const { REACT_APP_HOST } = process.env;
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Quiz One</h2>
          </div>
        {/* <AddExample/> */}
        </div>
        <div className="row column1">
          <LettersList4Quiz1/>
        </div>
      </div>
    </div>
  );
}
export default Quiz_1;
