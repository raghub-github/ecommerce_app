import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="mt-3">
      <h2 className="App">Login to continue to Rudraksha Store</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="email"
            value={credentials.email}
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="password"
            value={credentials.password}
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
