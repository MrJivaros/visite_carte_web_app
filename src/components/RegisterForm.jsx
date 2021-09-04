import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = () => {
  // declaration de la varible history
  const history = useHistory();

  //declaration des states
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [tel , setTel] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState({status: false, content: ''})


// declaration de la fonction de submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      email: mail, 
      password: pass,
      fullname : name,
      telephone : tel
    };
    
    const url = "http://localhost:4000/users/register";
    let login = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    });
    login = await login.json();
    if (login.status) {
      history.push('/');
    } else {
      if(login.content.keyValue.email){
        setErr(
          {
            status: true,
            content: 'Impossible to register with this email because it already exists'
          }
        )
      }else{
        setErr(
          {
            status: true,
            content: 'Server error'
          }
        )
      }
      
    }
  };

  return (
    <>
      <form className="form" onSubmit= {handleSubmit}>
        {/* fullname and telephone */}
        <div className="d-flex justify-content-between">
          <div className="form-group mb-3">
            <label htmlFor="fullname"> Fullname:</label>
            <input 
              type="text" 
              name="fullname" 
              className="form-control"
              value= {name}
              onChange= {(v)=>setName(v.target.value)}
               />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="tel"> Telephone:</label>
            <input 
              type="tel" 
              name="tel" 
              className="form-control"
              value={tel}
              onChange={(v)=>setTel(v.target.value)}
            />
            
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Votre email :</label>
          <input
            type="text"
            name="email"
            value={mail}
            onChange={(v) => setMail(v.target.value)}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between">
          <div className="form-group mb-3">
            <label htmlFor="pass">Password :</label>
            <input
              type="text"
              name="pass"
              value={pass}
              onChange={(v) => setPass(v.target.value)}
              className="form-control"
            />
            
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirm">Confirm :</label>
            <input
              type="text"
              name="confirm"
              className="form-control"
              value={confirm}
              onChange = {(v)=>setConfirm(v.target.value)}
            />
            
          </div>
        </div>

        <div className="form-group mb-3 d-flex justify-content-evenly">
          <button
            className="btn btn-lg btn-outline-success"
            style={{
              color: "#4A5345",
              fontWeight: 500,
              fontSize: "1em",
              minWidth: "150px",
            }}
          >
            Login
          </button>
          <button
            className="btn btn-lg btn-success"
            style={{
              color: "white",
              fontWeight: 500,
              fontSize: "1em",
              minWidth: "150px",
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
