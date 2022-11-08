import React, { useState, useEffect } from "react";
import { Link,useNavigate,Navigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";
function Users() {
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const user = localStorage.getItem('username');
    // #Open and close model
    const handleClose = () => setshow(false);
    const handleShow = () => setshow(true);
    
    const fetchData = async () => {
        if (user){
        //   try {
        //     const { data: response } = await axios.get(
        //       `${REACT_APP_HOST}getPhoneticsList.php`
        //     );
        //     SetPhonetics(response);
        //     console.log(response);
        //   } catch (error) {
        //     console.error(error.message);
        //   }
        }else{
          navigate('/');
        }
       
      };
      useEffect(() => {
        fetchData();
      }, []);
return(
    <>
    <NavBar/>
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title page_title">
          <div className="col-6">
            <div className="">
              <h2>Users List</h2>
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
              <span style={{paddingLeft:'5px'}}>Add User</span>
              </Button>
          </div>
        </div>
        <div className="row column1">
        
        </div>
      </div>
    </div>
    </>
)
}
export default Users;