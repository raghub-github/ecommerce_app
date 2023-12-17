import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "../styles/Button";
import "../App.css";
import { toast } from "react-toastify";

const host = process.env.REACT_APP_HOSTNAME;

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    const { name, email, mobile, password } = credentials;
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
        mobile,
        password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      // props.showAlert("Account Created Successfully", "success");
      toast.success("Account Created Successfully");
      navigate("/");
    } else {
      console.log("success = ", json);
      // props.showAlert("Invalid Details", "danger");
      toast.error(`${json.error ? json.error : "Error"}`);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ "padding": "4rem 0 4rem 0", "textAlign": "center" }} >
      <h2 className="App textStyle" >Create an account to use Rudraksha Store</h2>
      <div className="container" style={{ "marginTop": "5rem", "paddingTop": "60px", "paddingLeft": "50px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "50px", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
        <form className="formStyle" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="name"
            placeholder="ENTER YOUR NAME"
            onChange={onChange}
            id="name"
            style={{ textTransform: "none", "width": "100%" }}
            aria-describedby="nameHelp"
          />
          <input
            type="email"
            required
            name="email"
            placeholder="ENTER YOUR EMAIL ADDRESS"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="email"
            aria-describedby="emailHelp"
          />
          <input
            type="mobile"
            required
            name="mobile"
            placeholder="ENTER YOUR MOBILE NUMBER (only 10 digits required)"
            onChange={onChange}
            maxLength={10}
            id="mobile"
            style={{ textTransform: "none", "width": "100%" }}
            aria-describedby="mobileHelp"
          />
          <input
            type="password"
            required
            minLength={5}
            name="password"
            placeholder="ENTER YOU PASSWORD"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="password"
          />
          <input
            type="password"
            required
            minLength={5}
            name="cpassword"
            placeholder="CONFIRM PASSWORD"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="cpassword"
          />
          <input
            type="submit"
            className="contactInputs"
            value="SIGNUP"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
