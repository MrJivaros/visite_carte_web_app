import React, { useState,useEffect } from "react";
import HomeImage from "../components/registerImage";
import Form from "../components/RegisterForm";
import "../styles/App.css";
import {Link,useHistory} from 'react-router-dom'


function Register() {
  const history = useHistory()
  useEffect(()=>{
    const user = localStorage.getItem('user')
    if(user){
      history.push('/bibliotheque')
    }
  },[])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container-fluid p-0 d-md-flex flex-md-row-reverse">
      <div className="col-md-7 col-sm-12">
        <HomeImage classname="img-fluid" />
      </div>

      <div className="col-md-5 col-sm-12  d-flex flex-column justify-content-center p-3">
        <div className="shadow p-4">
          <div className="container-fluid text-center">
            <h1>Welcome</h1>
            <p style={{color:'#4A5345'}}>Please create an account to continus</p>
          </div>
          <Form email={email} password={password} />

          <div className="d-flex justify-content-end">
            <p>
                If you have an account log <Link to="/"> here</Link> ! 
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
