import React, { useState, useEffect } from "react";
import axios from "axios";
import LettersList from "./LettersList";
import { Button, Modal } from "react-bootstrap";

function PhoneticsList() {
  const { REACT_APP_HOST } = process.env;
    // #Open and close model
    const handleClose = () => setshow(false);
    const handleShow = () => setshow(true);
    const [show, setshow] = useState(false);
    const [name, setname] = useState("");
    const [nameError, setnameError] = useState(false);
     //  form validation
  const validate = () => {
    if (name == "") {
      setnameError(true);
    } else {
      setnameError(false);
    }
   
    if (name == "") {
      return false;
    } else {
      return true;
    }
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (isValid) {
      const uploadData = new FormData();
      uploadData.append("name", name)
      axios
        .post( `${REACT_APP_HOST}getPhoneticsList.php`, uploadData)
        .then((res) => {
          console.log(res);
         
        })
        .catch((error) => console.log(error));
    }};
  return (
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title page_title">
          <div className="col-6">
            <div className="">
              <h2>Phonetics List</h2>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
          <Button
                type="button"
                style={{background:'none',border:'none',color:'#15283c'}}
                onClick={() => {
                  handleShow();
                }}
              >
              <img
                  src="http://localhost:3000/images/icons/plus.png"
                />
              <span style={{paddingLeft:'5px'}}>Add Phonetics</span>
              </Button>
          </div>
        </div>
        <div className="row column1">
          <LettersList/>
        </div>
        <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Phonetics List</h6>
            </Modal.Title>
            <button onClick={handleClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-sort-alpha-down"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setname(evt.target.value)}
                placeholder="Add Phonetics" aria-label="Username" aria-describedby="basic-addon1"/>
              </div>
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#1ed085",
                    border: '1px solid #15283c'
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Save Phonetics
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    </div>
  );
}
export default PhoneticsList;
