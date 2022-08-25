import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function QuiztwoPhonetics() {
  const { REACT_APP_HOST } = process.env;
  const { phonetic_name } = useParams();
  console.log('phonetic_name',phonetic_name)
  const [PhoneticsQuiztwo, SetPhoneticsQuiztwo] = useState([]);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getQuiz2.php?name=${phonetic_name}`
      );
      SetPhoneticsQuiztwo(response);
      console.log('PhoneticsQuiztwo',response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const PhoneticsQuiz2List = PhoneticsQuiztwo.map((quiz, i) => {
    // return (   
    //     <ul>
    //     {quiz.data.map(q => 
    //       <li>{q.correct_word}</li>
    //     )}
    //   </ul>
        
    // )
    return (
        <div className="row">
            <div className="col-md-3 specialcol">
                <div className="boxContainer">
                
                {quiz.data.map(q => 
                <>
                <div className="boxlayout">
                        <div>
                            <img
                            className="img-responsive"
                            src={'https://mysqltest955.000webhostapp.com/'+q.image_url}
                            alt="#"
                        />
                        <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {q.correct_word}</span>

                        </div>
                    </div>
                    <div  className="boxlayout">
                    <audio key={q.id}  controls className="Play">
                        <source src={'https://mysqltest955.000webhostapp.com/'+q.voice_url}  type="audio/mp3"></source>
                    </audio>
                    </div>
                    </>
                    )}
                
                </div>  
            </div>
        </div>

     
      
    )
});
  return (
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Quiz Two for Letter {phonetic_name}</h2>
          </div>
        </div>
        <div className="row column1">
         
        </div>
        <div className="row column1">{PhoneticsQuiz2List}</div>
     
      </div>
    </div>
  );
}
export default QuiztwoPhonetics;
