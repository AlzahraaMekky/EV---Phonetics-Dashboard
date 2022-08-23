import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LettersList from "./LettersList";

function PhoneticsList() {
  const { REACT_APP_HOST } = process.env;
  return (
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title">
          <div className="col-md-12">
            <div className="page_title">
              <h2>Phonetics Examples</h2>
            </div>
          </div>
        </div>
        <div className="row column1">
          <LettersList/>
        </div>
      </div>
    </div>
  );
}
export default PhoneticsList;
