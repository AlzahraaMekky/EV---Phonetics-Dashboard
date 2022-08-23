import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LettersSelectOption from "./LettersSelectOption";
function PhoneticsSamples() {
  const { REACT_APP_HOST } = process.env;
  const { phonetic_name } = useParams();
  const [isActive, setIsActive] = useState(0);
  const [show, setshow] = useState(false);
  const [word, setword] = useState("");
  const [letter, setletter] = useState("");
  console.log('phonetic_name',phonetic_name)
  console.log('letter',letter)
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
  // #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  const handleActiveClass = (i) => {
    setIsActive(i);
    console.log('IsActive',isActive)
    
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
                id={i}
                onClick={()=> {fetchData(type);handleActiveClass(i)}}
                className={isActive == i ? 'activeBtn button-50' : 'button-50'} 
                role="button"
            >
             {checkType(type)}
            </button>
            </div>
        </>
    )
  });
  const PhoneticsExamplesList = PhoneticsExamples.map((example, i) => {
    return (
      <>
      <div className="col-md-6 specialcol">
      <div className="boxContainer">
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
        <div  className="boxlayout">
          <audio key={example.id}  controls className="Play">
            <source src={'https://mysqltest955.000webhostapp.com'+example.voice}  ttype="audio/mp3"></source>
          </audio>
        </div>
       </div>  
      </div>
      </>
    );
  });
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
            <div className="">
              <h2>Phonetics Samples for Letter {phonetic_name}</h2>
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
              <span style={{paddingLeft:'5px'}}>Add Example</span>
              </Button>
          </div>
        </div>
        <div className="row column1">
          {typeList}
        </div>
        <div className="row column1">{PhoneticsExamplesList}</div>
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
            <form >
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-sort-alpha-down"></i></span>
                </div>
                <select
                onChange={(evt) => setletter(evt.target.value)}
                class="custom-select"
                name="problem"
                >
                <option selected>Select Phonetics ..</option>
               <LettersSelectOption/>
                </select>
            </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-sort-alpha-down"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setword(evt.target.value)}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-sort-alpha-down"></i></span>
                </div>
                <input type="file" className="form-control" onChange={(evt) => setword(evt.target.value)}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
             
              {/* {flashmsgshow ? (
                alertError()
              ) : null}
              {letterError ? (
                alertletterError()
              ) : null} */}
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
