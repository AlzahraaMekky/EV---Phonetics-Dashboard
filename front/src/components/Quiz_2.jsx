import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LettersList4Quiz2 from "./LettersList4Quiz2";
import AddQuiztwo from "./AddQuiztwo";

function Quiz_2() {
  const { REACT_APP_HOST } = process.env;
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Quiz two</h2>
          </div>
        {/* <AddQuiztwo/> */}
        </div>
        <div className="row column1">
          <LettersList4Quiz2/>
        </div>
      </div>
    </div>
  );
}
export default Quiz_2;
