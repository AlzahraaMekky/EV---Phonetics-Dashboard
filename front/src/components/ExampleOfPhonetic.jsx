import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
function PhoneticsSamples() {
  const {REACT_APP_HOST} = process.env;
  const { phonetic_name } = useParams();
  const [word, setword] = useState("");
  const [voice, setvoice] = useState();
  const [Type, setType] = useState("i");
  const [FileError, setFileError] = useState(false);
  const [wordExitError, setwordExitError] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [wordError, setwordError] = useState(false);
  const [voiceError, setvoiceError] = useState(false);
  const [show, setshow] = useState(false);
  console.log('phonetic_name',phonetic_name)
  const [PhoneticsExamples, SetPhoneticsExamples] = useState([]);
  const fetchData = async (type='i') => {
    console.log('phonetic_name',phonetic_name,'type',type)
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getPhoneticExamples.php?phonetic_name=${phonetic_name}&type=${type}`
      );
      SetPhoneticsExamples(response);
      console.log('PhoneticsExamples',response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const successMsgAlert = () => {
    Swal.fire('Phonetics Example added')
  };
// #Open and close model
const handleClose = () => setshow(false);
const handleShow = () => setshow(true);
const handleDeleteExample=(id)=>{
  console.log('ExampleID',id)
  console.log('letterId',id)
  const uploadData = new FormData();
  uploadData.append("example_id", id)
  axios
  .post( `${REACT_APP_HOST}deleteExample.php`, uploadData)
  .then((res) => {
  console.log(res);
  if (res.data=='delete'){
    fetchData();
  } 
})
  .catch((error) => console.log(error));
}

  const handleActiveClass = (i) => {
    setIsActive(i);
    console.log('IsActive',isActive)
    
  }
  const handletype = (type) => {
    setType(type);
    console.log('from handletype',Type)

  }
  const types = ['i', 'm', 'f'];
  function checkType(type) {
    if (type=='i'){
        return (
            <>
            <span style={{paddingRight:'5px',fontWeight:'bolder'}}>&#8212;</span>
            <span>{phonetic_name}</span>
            </> 
        )
    } 
    if (type=='m'){
        return (
            <>
            <span style={{paddingRight:'5px',fontWeight:'bolder'}}>&#8212;</span>
            <span>{phonetic_name}</span>
            <span style={{paddingLeft:'5px',fontWeight:'bolder'}}>&#8212;</span>
            </>
        )
    } 
    if (type=='f'){
        return (
            <>
            <span>{phonetic_name}</span>
            <span style={{paddingLeft:'5px',fontWeight:'bolder'}}>&#8212;</span>
            </>
        )
    } 
  }
  const typeList = types.map((type, i) => {   
    return(
        <>
         <div className="col-md-2">
            <button style={{marginBottom:'20px'}}
                key={i}
                onClick={()=> {fetchData(type);handleActiveClass(i);handletype(type)}}
                className={isActive == i ? 'activeBtn button-50' : 'button-50'} 
                role="button"
            >
             {checkType(type)}
            </button>
            </div>
        </>
    )
  });
    //  form validation
    const validate = () => {
      if (word == "") {
          setwordError(true)
      } else {
          setwordError(false)
      }
      if (!voice) {
          setvoiceError(true)
      } else {
          setvoiceError(false)
      }
  
      if (word==""||!voice) {
          return false;
      } else {
          return true;
      }
      };
  const handleSubmit = (e) => {
    // let Type = handletype();
    // console.log('type from handle submit',Type)
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("phonetic_name", phonetic_name)
    uploadData.append("word", word)
    uploadData.append("type", Type)
    uploadData.append("voice", voice, voice.name);
    axios
        .post( `${REACT_APP_HOST}addExample2.php`, uploadData)
        .then((res) => {
        console.log(res);
        if (res.data=='file'){
          setFileError(true);
        }
        if (res.data == 'word'){
          setwordExitError(true);
          
        }
        if (res.data>0){
          handleClose()
          successMsgAlert();
          fetchData();
          
        }      
    })
        .catch((error) => console.log(error));
    }};
  const PhoneticsExamplesList =()=>{
    let phoneticssExampleLength = PhoneticsExamples.length
    console.log('phoneticssExampleLength',phoneticssExampleLength)
    if (phoneticssExampleLength >0){
       return(
        PhoneticsExamples.map((example, i) => 
        <div className="col-md-6">
        <div className="row">
          <div className="col">
          <div className="boxlayout">
            <div>
                <img
                className="img-responsive"
                src="http://localhost:3000/images/icons/scrabble.png"
                alt="#"
              />
             <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {example.word}</span>

            </div>
        </div>
          </div>
          <div className="col">
          <div  className="boxlayout">
          <audio key={example.id}  controls className="Play">
            <source src={'http://147.182.181.209/phonetics_app'+example.voice}  type="audio/mp3"></source>
          </audio>
          </div>
          </div>
          <div className="col">
          <div  className="boxlayout">
         
          <button className="letterExample" onClick={()=>handleDeleteExample(example.id)}>
                <img src="http://localhost:3000/images/icons/delete.png"/>
            </button>
        </div>
          </div>
        </div>
  
        </div>
    )
    )  
    }else{
      return(<p>No Examples</p>)
    }
  }
  const alertwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordError(false)} show={wordError} delay={3000} autohide>
            <Toast.Body>Phonetics word can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertvoiceError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setvoiceError(false)} show={voiceError} delay={3000} autohide>
            <Toast.Body>Phonetics voice can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertExitwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordExitError(false)} show={wordExitError} delay={3000} autohide>
            <Toast.Body>Phonetics word Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertFileError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
            <Toast.Body>Phonetics Voice Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Examples for Letter {phonetic_name}</h2>
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
            <span style={{paddingLeft:'5px'}}>Add Example</span>
            </Button>
        </div>
        </div>
        <div className="row column1">
          {typeList}
        </div>
        <div className="row column1">{PhoneticsExamplesList()}</div>
     {/* <!--modal --> */}
     <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Example </h6>
            </Modal.Title>
            <button onClick={handleClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setword(evt.target.value)}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              {wordError ? (
                alertwordError()
              ) : null}
               {wordExitError ? (
                alertExitwordError()
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-volume"></i></span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setvoice(evt.target.files[0])}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
             
              {voiceError ? (
                alertvoiceError()
              ) : null}
              {FileError ? (
                alertFileError()
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
                  Save Example
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
export default PhoneticsSamples;
