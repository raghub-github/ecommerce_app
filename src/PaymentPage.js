// PaymentPage.js
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import { useUserContext } from "./context/user_context";
// import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_HOSTNAME;

const PaymentPage = () => {
  const [userAddress, setUserAddress] = useState({ name: '', district: '', phone: '', alterPhone: '', vill_houseNo: '', post_office:'', state: '', city: '', pin: '', landmark: '' });
  const [userDataBul, setUserdataBul] = useState(true);
  // let navigate = useNavigate();
  const { cart, total_price, shipping_fee } = useCartContext();
  const { user, getData } = useUserContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  console.log("user address", user);
  console.log("cart", cart);
  // const userAddressall = user.address;
  useEffect(() => {
    const ad = user.address;
    if (ad && Object.keys(ad).length > 0 && userDataBul) {
      setUserAddress({
        name: ad.name,
        district: ad.district || '', // Check if ad.district exists
        phone: ad.phone,
        alterPhone: ad.alterPhone || '', // Check if ad.alterPhone exists
        vill_houseNo: ad.vill_houseNo || '',
        post_office: ad.post_office || '',
        state: ad.state || '',
        city: ad.city || '',
        pin: ad.pin || '',
        landmark: ad.landmark || ''
      });
      setUserdataBul(false);
    } else {
      setUserAddress({
        name: user.name,
        phone: user.phone,
      });
    }
  }, [userDataBul]);

  const handleAddressChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("Changing", name, "to", value);
    setUserAddress((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  
  // console.log("user", userAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, district, phone, alterPhone, vill_houseNo, post_office, state, city, pin, landmark } = userAddress;
    // API Call
    console.log("phone",phone);
    const response = await fetch(`${host}/api/auth/updateuser/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({address: {name, district, phone, alterPhone, vill_houseNo, post_office, state, city, pin, landmark}
      }),
    });
    const json = await response.json();
    if (response.ok) {
      // navigate("/");
      console.log("json", json);
      setIsFormSubmitted(true);
      alert("success", json)
      // setUserdataBul(true);
    } else {
      console.log("error = ", json);
      alert("error",json)
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
            <div className="container" style={{ "marginTop": "1rem", "paddingTop": "1px", "paddingLeft": "70px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "1px", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
              <form className="formStyle" onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                  <label className='label-form' htmlFor="name">Name:*
                    <input
                      type="text"
                      value={userAddress.name}
                      required
                      name="name"
                      placeholder="ENTER YOUR NAME"
                      onChange={handleAddressChange}
                      id="name"
                      style={{ textTransform: "none", width: "100%" }}
                      aria-describedby="nameHelp"
                    /></label>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                  <label className='label-form' htmlFor="phone">Phone Number:
                    <input
                      type="mobile"
                      value={userAddress.phone}
                      required
                      name="phone"
                      placeholder="MOBILE NUMBER (only 10 digits required)"
                      onChange={handleAddressChange}
                      maxLength={11}
                      id="phone"
                      style={{ textTransform: "none" }}
                      aria-describedby="phoneHelp"
                    /></label>
                  <label className='label-form' htmlFor="phone">Alternative Phone Number:
                    <input
                      type="mobile"
                      value={userAddress.alterPhone}
                      name="alterPhone"
                      placeholder="ALTERNATIVE MOBILE NUMBER"
                      onChange={handleAddressChange}
                      maxLength={10}
                      id="alterPhone"
                      style={{ textTransform: "none" }}
                      aria-describedby="mobileHelp"
                    /></label></div>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                  <label className='label-form' htmlFor="phone">Village /House No. /Flat:
                    <input
                      type="text"
                      value={userAddress.vill_houseNo}
                      required
                      minLength={5}
                      name="vill_houseNo_flat_buildingName"
                      placeholder="Village/House No./Flat/Building Name"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none", width: "100%" }}
                      id="vill_houseNo_flat_buildingName"
                    /></label>
                  <label className='label-form' htmlFor="phone">Post Office:
                    <input
                      type="text"
                      value={userAddress.post_office}
                      required
                      minLength={2}
                      name="post_office"
                      placeholder="Post Office"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none", width: "100%" }}
                      id="post_office"
                    /></label>
                    </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                  <label className='label-form' htmlFor="phone">State:
                    <input
                      type="text"
                      value={userAddress.state}
                      required
                      minLength={5}
                      name="state"
                      placeholder="STATE"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none" }}
                      id="state"
                    /></label>
                  <label className='label-form' htmlFor="district">District:
                    <input
                      type="text"
                      value={userAddress.district}
                      required
                      name="district"
                      placeholder="DISTRICT"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none" }}
                      id="district"
                      aria-describedby="districtHelp"
                    /></label>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                  <label className='label-form' htmlFor="phone">City:
                    <input
                      type="text"
                      value={userAddress.city}
                      required
                      minLength={5}
                      name="city"
                      placeholder="CITY"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none" }}
                      id="city"
                    /></label>
                  <label className='label-form' htmlFor="phone">Pin:
                    <input
                      type="text"
                      value={userAddress.pin}
                      required
                      minLength={5}
                      name="pin"
                      placeholder="PIN CODE"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none" }}
                      id="pin"
                    /></label>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>
                  <label className='label-form' htmlFor="phone">Landmark:
                    <input
                      type="text"
                      value={userAddress.landmark}
                      minLength={5}
                      name="landmark"
                      placeholder="LANDMARK"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none", width: "100%" }}
                      id="landmark"
                    /></label></div>
                <input
                  type="submit"
                  className="contactInputs"
                  value="CONFIRM"
                />
              </form>
            </div>
          </div>

          <div style={{ flex: 1, padding: '20px', alignItems: "center", textAlign: "center" }}>
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
  padding: 4rem 0;

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
