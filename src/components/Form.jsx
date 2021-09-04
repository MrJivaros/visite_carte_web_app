import React, { useState } from "react";
import {useHistory} from 'react-router-dom'


const Form = ({ email, password }) => {
  //declaration de la variable history
  const history = useHistory()

  //declaration des states
  const [mail, setMail] = useState(email);
  const [pass, setPass] = useState(password);
  const [err, setError] = useState({status: false, content: ''})


  // fonction submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: mail, password: pass };
    const url = "http://localhost:4000/users/login";
    let login = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    });
    login = await login.json();
    if (login.status) {
      console.log(login)
      localStorage.setItem('user', JSON.stringify(login))
      history.push('/bibliotheque')
    } else {
      setError({status: true, content: 'Your email adress or password is incorrect'})
    }
  };

  return (
    <>
      <form className="form">
        <div className="form-group mb-3">
          <label htmlFor="email">Votre email :</label>
          <input
            type="text"
            name="email"
            value={mail}
            onChange={(v) => setMail(v.target.value)}
            className="form-control
                        "
          />
        </div>

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
        {
          err.status && (
            <div className="alert alert-danger text-center">
              {err.content}
            </div>
          )
        }
        <div className="form-group mb-3">

        </div>

        <div className="form-group mb-3 d-flex justify-content-evenly">
          <button
            className="btn btn-lg btn-outline-success"
            style={{ color: "#4A5345", fontWeight: 500, fontSize: "1em",minWidth:'150px' }}
          >
            Create Account
          </button>
          <button
            className="btn btn-lg btn-success"
            onClick={handleSubmit}
            style={{
              color: "white",
              fontWeight: 500,
              fontSize: "1em",minWidth:'150px'
            }}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
