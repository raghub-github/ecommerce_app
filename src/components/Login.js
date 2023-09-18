import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
// const host = "http://localhost:3001";
const host = "http://134.122.17.33:5000";

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
    <div className="container" style={{ "padding": "4rem 0 4rem 0", "textAlign": "center" }}>
      <h2 className="textStyle" >Login to continue to Rudraksha Store</h2>
      <div className="container" style={{ "marginTop": "5rem", "paddingTop": "50px", "paddingLeft": "50px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "50px", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
        <form
          onSubmit={handleSubmit}
          className="formStyle"
        >
          <input
            type="email"
            value={credentials.email}
            name="email"
            id="email"
            placeholder="ENTER EMAIL ADDRESS"
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
            placeholder="ENTER YOUR PASSWORD"
            required
          />
          <input className="contactInputs" type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
};

export default Login;
