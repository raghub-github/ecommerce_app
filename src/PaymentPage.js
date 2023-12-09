// PaymentPage.js
import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_HOSTNAME;

const PaymentPage = () => {
    const [userAddress, setUserAddress] = useState({ name: '', email: '', phone: '', alterPhone: '', address: '', state: '', city: '', pin: '', landmark: '' });
    let navigate = useNavigate();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setUserAddress((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        const { name, email, phone, alterPhone, address, state, city, pin, landmark } = userAddress;
        e.preventDefault();
        // API Call
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, phone, alterPhone, address, state, city, pin, landmark
            }),
        });
        const json = await response.json();
        if (json.success) {
            // navigate("/");
            setIsFormSubmitted(true);
        } else {
            // console.log("success = ", json.success);
        }
    };

    //   const onChange = (e) => {
    //     setAddress({ ...address, [e.target.name]: e.target.value });
    //   };

    return (<>
        <Wrapper>
            <div className="container">
                <div className="grid grid-two-column">
                    {/* <div className="hero-section-data">
                        <p className="intro-data">Welcome to </p>
                        <h1 className="setStyle" style={{ color: "#410000" }}> {name} </h1>
                        <p> <strong style={{ color: "rgb(9 74 0)" }}>  In the yogic tradition, Rudraksha are considered as the "Tears of Shiva" and not just an accessory or a piece of jewellery. It is seen as an instrument for inner transformation.This guide tells you all you need to know about this sacred seed.</strong></p>
                        <NavLink to="./products">
                            <Button>show now</Button>
                        </NavLink>
                    </div> */}

                    <div className="hero-section-data" style={{ "textAlign": "center", }} >
                        <h2 className="textStyle" >Delivary Address</h2>
                        <div className="container" style={{ "marginTop": "1rem", "paddingTop": "2px", "paddingLeft": "70px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "5px", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
                            <form className="formStyle" onSubmit={handleSubmit}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <label className='label-form' htmlFor="name">Name:*
                                        <input
                                            type="text"
                                            required
                                            name="name"
                                            placeholder="ENTER YOUR NAME"
                                            onChange={handleAddressChange}
                                            id="name"
                                            style={{ textTransform: "none" }}
                                            aria-describedby="nameHelp"
                                        /></label>
                                    <label className='label-form' htmlFor="email">Email:
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            placeholder="EMAIL ADDRESS"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none" }}
                                            id="email"
                                            aria-describedby="emailHelp"
                                        /></label></div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <label className='label-form' htmlFor="phone">Phone Number:
                                        <input
                                            type="mobile"
                                            required
                                            name="phone"
                                            placeholder="MOBILE NUMBER (only 10 digits required)"
                                            onChange={handleAddressChange}
                                            maxLength={10}
                                            id="phone"
                                            style={{ textTransform: "none" }}
                                            aria-describedby="mobileHelp"
                                        /></label>
                                    <label className='label-form' htmlFor="phone">Alternative Phone Number:
                                        <input
                                            type="mobile"
                                            required
                                            name="alterPhone"
                                            placeholder="ALTERNATIVE MOBILE NUMBER"
                                            onChange={handleAddressChange}
                                            maxLength={10}
                                            id="alterPhone"
                                            style={{ textTransform: "none" }}
                                            aria-describedby="mobileHelp"
                                        /></label></div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                                    <label className='label-form' htmlFor="phone">Address:
                                        <input
                                            type="text"
                                            required
                                            minLength={5}
                                            name="address"
                                            placeholder="ENTER YOUR ADDRESS"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none", width: "100%" }}
                                            id="address"
                                        /></label></div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <label className='label-form' htmlFor="phone">State:
                                        <input
                                            type="text"
                                            required
                                            minLength={5}
                                            name="state"
                                            placeholder="STATE"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none" }}
                                            id="state"
                                        /></label>
                                    <label className='label-form' htmlFor="phone">City:
                                        <input
                                            type="text"
                                            required
                                            minLength={5}
                                            name="city"
                                            placeholder="CITY"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none" }}
                                            id="city"
                                        /></label></div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                    <label className='label-form' htmlFor="phone">Pin:
                                        <input
                                            type="text"
                                            required
                                            minLength={5}
                                            name="pin"
                                            placeholder="PIN CODE"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none" }}
                                            id="pin"
                                        /></label>
                                    <label className='label-form' htmlFor="phone">Landmark:
                                        <input
                                            type="text"
                                            required
                                            minLength={5}
                                            name="landmark"
                                            placeholder="LANDMARK"
                                            onChange={handleAddressChange}
                                            style={{ textTransform: "none" }}
                                            id="landmark"
                                        /></label></div>

                                <input
                                    type="submit"
                                    className="contactInputs"
                                    value="ADD ADDRESS"
                                />
                            </form>
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '20px' }}>
                        <h2>Subtotal</h2>
                        <button disabled={!isFormSubmitted}>Pay Now</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    </>
    );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }
  .grid{
    display:flex;
  }
  .hero-section-data {

    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    position: relative;

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 130%;
    height: auto;
    align-items:center;
    justify-contants:center;
  }
  .img-style:hover {
    width: 135%;
    transition: all 0.8s ease-in-out;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 5rem 0;
    .grid {
      gap: 9rem;
      display:inline-block;
    }

    .setStyle{
      font-size: 6rem;
      font-family: "roboto",sans-serif;
    }

    .hero-section-data{
      margin:11%;
    }

    .img-style {
      width: 100%;
      height: auto;
      align-items:center;
      justify-contants:center;
    }
    .img-style:hover {
      width: 105%;
      transition: all 0.8s ease-in-out;
    }
    
    figure::after {
      content: "";
      width: 90%;
      height: 90%;
      left: 0;
      top: 20%;
      margin-left:-20px;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default PaymentPage;
