import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CredentialsContext} from "../App";
import { useContext } from "react";

const Login  = (props) => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [, setCredentials] = useContext(CredentialsContext);


  const handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  function login(e) {
    e.preventDefault();
    fetch("https://api-call-notes.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({ username, password });
        props.setIsAuthenticated(true);
        history("/");
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }


  return (
    <div className="logins">
    <div className="login">
      <h1>Login</h1>
      {isError && <div>User Already Exists</div>}
      <form className="login-form">
        <div className="label-login">
          <label>Username:</label>
          <input type="text" name="username" className="text-login" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="label-login">
          <label>Password:</label>
          <input type="password" name="password" className="text-login" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button type="Submit" className="login-button" onClick={login}>LOGIN</button>
        </div>
      </form>
      </div>
      </div>
  )
}

export default Login;