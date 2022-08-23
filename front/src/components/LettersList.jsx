import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LettersList() {
  const { REACT_APP_HOST } = process.env;
  const [Phonetics, SetPhonetics] = useState([]);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getPhoneticsList.php`
      );
      SetPhonetics(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const PhoneticsList = Phonetics.map((phonetics, i) => {
    return (
      <>
        <div key={i} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  return (
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column1">
          {PhoneticsList}
        </div>
      </div>
    </div>
  );
}
export default LettersList;
