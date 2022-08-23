import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PhoneticsSamples() {
  const { REACT_APP_HOST } = process.env;
  const { phonetic_name } = useParams();
  const [isActive, setIsActive] = useState(0);
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
       <div className="row column1">
        <div className="col-md-4">
            <div>
                <img
                className="img-responsive"
                src="http://localhost:3000/images/icons/scrabble.png"
                alt="#"
              />
             <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {example.word}</span>

            </div>
          </div>
          <div  className="col-md-4">
            <audio key={example.id}  controls className="Play">
              <source src={'https://mysqltest955.000webhostapp.com'+example.voice}  ttype="audio/mp3"></source>
            </audio>
           </div>
       </div>
        <div style={{marginBottom:'5px'}}></div>
      </>
    );
  });
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title">
          <div className="col-md-12">
            <div className="page_title">
            <h2>Phonetics Samples for Letter {phonetic_name}</h2>
            </div>
          </div>
        </div>
 
        <div className="row column1">
          {typeList}
        </div>
        {PhoneticsExamplesList}
      </div>
    </div>
  );
}
export default PhoneticsSamples;
