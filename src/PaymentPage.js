// PaymentPage.js
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import { useUserContext } from "./context/user_context";
import { toast } from "react-toastify";
import FormatPrice from "./Helpers/FormatePrice";
// import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_HOSTNAME;

const PaymentPage = () => {
  const [userAddress, setUserAddress] = useState({ name: '', district: '', phone: '', alterPhone: '', vill_houseNo: '', post_office: '', state: '', city: '', pin: '', landmark: '' });
  const [userDataBul, setUserdataBul] = useState(true);
  // let navigate = useNavigate();
  const { cart, total_price, shipping_fee } = useCartContext();
  const { user, getData } = useUserContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const userAddressall = user.address;
  useEffect(() => {
    const ad = user.address;
    if (ad && Object.keys(ad).length > 0 && userDataBul) {
      setUserAddress({
        name: ad.name,
        district: ad.district || '', // Check if ad.district exists
        phone: ad.phone,
        alterPhone: ad.alterPhone || '',
        vill_houseNo: ad.vill_houseNo || '',
        post_office: ad.post_office || '',
        state: ad.state || '',
        city: ad.city || '',
        pin: ad.pin || '',
        landmark: ad.landmark || ''
      });
      setUserdataBul(false);
    }
  }, [user, userDataBul]);

  const handleAddressChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserAddress((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, district, phone, alterPhone, vill_houseNo, post_office, state, city, pin, landmark } = userAddress;
    // API Call
    const response = await fetch(`${host}/api/auth/updateuser/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        address: { name, district, phone, alterPhone, vill_houseNo, post_office, state, city, pin, landmark }
      }),
    });
    const json = await response.json();
    if (response.ok) {
      // navigate("/");
      getData();
      setIsFormSubmitted(true);
      toast.success("Address saved successfully");
      // setUserdataBul(true);
    } else {
      toast.error(`${json.error}`);
    }
  };

  return (<>
    <Wrapper>
      <div className="container" >
        <div className="grid grid-two-column" style={{ justifyContent:"center"}}>
          <div className="hero-section-data" style={{ "textAlign": "center", }} >
            <div className="container" style={{ "marginTop": "1rem", "paddingTop": "3rem", "paddingLeft": "70px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "3rem", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
              <h2 className="textStyle" >Delivary Address</h2>
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
                      minLength={4}
                      name="vill_houseNo"
                      placeholder="Village/House No./Flat/Building Name"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none", width: "100%" }}
                      id="vill_houseNo"
                    /></label>
                  <label className='label-form' htmlFor="phone">Post Office:
                    <input
                      type="text"
                      value={userAddress.post_office}
                      required
                      minLength={4}
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
                      minLength={2}
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
                      minLength={2}
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
                      minLength={6}
                      maxLength={6}
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
                      name="landmark"
                      placeholder="LANDMARK"
                      onChange={handleAddressChange}
                      style={{ textTransform: "none", width: "100%" }}
                      id="landmark"
                    /></label></div>
                {/* <input
                  type="submit"
                  className="contactInputs"
                  value="CONFIRM"
                /> */}
                <button type='submit' className="contactInputs" style={{ color: "white", borderColor: "rgb(98, 84, 243)", backgroundColor: "rgb(98, 84, 243)", paddingRight: "25px", paddingLeft: "25px", paddingTop: "12px", paddingBottom: "12px" }}>CONFIRM</button>
              </form>
            </div>
          </div>

          <div className="hero-section-data" style={{ "textAlign": "center", }} >
            <div className="container" style={{ "marginTop": "1rem", "paddingTop": "3rem", "paddingLeft": "70px", "paddingRight": "50px", "boxSizing": "border-box", "borderRadius": "10px", "paddingBottom": "3rem", "backgroundColor": "rgb(227 245 255 / 28%)" }}>
              <h3 style={{ fontSize: "35px" }}>Subtotal</h3>
              <hr />
              <h3><FormatPrice price={total_price + shipping_fee} /></h3>
              {/* <button disabled={!isFormSubmitted}>Pay Now</button> */}
              <button disabled={!isFormSubmitted} type='submit' className="contactInputs" style={{ color: "white", borderColor: "rgb(98, 84, 243)", backgroundColor: "rgb(98, 84, 243)", paddingRight: "25px", paddingLeft: "25px", paddingTop: "12px", paddingBottom: "12px" }}>PAY NOW</button>
            </div>
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
