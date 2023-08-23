import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    // API Call
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    } else {
      console.log("success = ", json.success);
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className="container mt-3">
      <h2 className="App">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="text"
            required
            name="name"
            onChange={onChange}
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="email"
            required
            name="email"
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile Number
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="mobile"
            required
            name="mobile"
            onChange={onChange}
            className="form-control"
            id="mobile"
            aria-describedby="mobileHelp"
          />
          <div id="mobileHelp" className="form-text">
            We'll never share your mobile number with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="password"
            required
            minLength={5}
            name="password"
            onChange={onChange}
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            style={{ backgroundColor: "rgb(13 0 23)", color: "white" }}
            type="password"
            required
            minLength={5}
            name="cpassword"
            onChange={onChange}
            className="form-control"
            id="cpassword"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
