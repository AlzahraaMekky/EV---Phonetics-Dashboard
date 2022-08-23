import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Toast from 'react-bootstrap/Toast';
function PhoneticsList() {
  const { REACT_APP_HOST } = process.env;
    // #Open and close model
    const handleClose = () => setshow(false);
    const handleShow = () => setshow(true);
    const [show, setshow] = useState(false);
    const [name, setname] = useState("");
    const [flashmsgshow, setflashmsgshow] = useState(false);
    const [letterError, setletterError] = useState(false);
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
          <div className="col-md-2">
            <Link key={phonetics.id} 
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
    const successMsgAlert = () => {
      Swal.fire('Phonetics Leter added')
    };
     //  form validation
  const validate = () => {
    if (name == "") {
      setflashmsgshow(true)
    } else {
      setflashmsgshow(false)
    }
   
    if (name == "") {
      return false;
    } else {
      return true;
    }
  };


const alertError = () =>  {
  return (
    <div className="row d-flex justify-content-center">
        <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setflashmsgshow(false)} show={flashmsgshow} delay={3000} autohide>
          <Toast.Body>Phonetics Name can not be empty!</Toast.Body>
        </Toast>
    </div>
  );
}
const alertletterError = () =>  {
  return (
    <div className="row d-flex justify-content-center">
        <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setletterError(false)} show={letterError} delay={3000} autohide>
          <Toast.Body>Phonetics Name Exit !</Toast.Body>
        </Toast>
    </div>
  );
}
    const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (isValid) {
      const uploadData = new FormData();
      uploadData.append("name", name)
      axios
        .post( `${REACT_APP_HOST}addNewPhonetic.php`, uploadData)
        .then((res) => {
          console.log(res);
          if (res.data>0){
            console.log('insert into database')
            setflashmsgshow(false)
            setletterError(false)
            setname("")
            handleClose()
            successMsgAlert()
            fetchData()
          }if (res.data==-1){
            console.log('letter exit in database')
            setletterError(true)
            setflashmsgshow(false)
          }
         
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
          {PhoneticsList}
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
             
              {flashmsgshow ? (
                alertError()
              ) : null}
              {letterError ? (
                alertletterError()
              ) : null}
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#1ed085",
                    border: '1px solid #15283c'
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
