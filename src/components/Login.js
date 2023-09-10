import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
const host = "http://localhost:3001";

const Login = (props) => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      props.showAlert("logged In Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ "padding": "4rem 0 4rem 0", "textAlign": "center" }}>
      <h2 className="textStyle" >Login to continue to Rudraksha Store</h2>
      <div style={{ "marginTop": "5rem" }} >
        <form
          onSubmit={handleSubmit}
          className="formStyle"
        >
          <input
            type="email"
            value={credentials.email}
            name="email"
            id="email"
            placeholder="Enter email address"
            aria-describedby="emailHelp"
            style={{ textTransform: "none", "width": "100%" }}
            // value={isAuthenticated? user.name: ""}
            onChange={onChange}
          />
          <input
            type="password"
            value={credentials.password}
            name="password"
            id="password"
            style={{ textTransform: "none", "width": "100%" }}
            onChange={onChange}
            placeholder="Enter Your Password"
            required
          />
          <input className="contactInputs" type="submit" value="send" />
        </form>
      </div>
    </div>
  );
};

export default Login;
