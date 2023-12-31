import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import image1 from "../image/rud2.jpeg"

const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1 className="setStyle" style={{color:"#410000"}}> {name} </h1>
             <p> <strong style={{color:"rgb(9 74 0)"}}>  In the yogic tradition, Rudraksha are considered as the "Tears of Shiva" and not just an accessory or a piece of jewellery. It is seen as an instrument for inner transformation.This guide tells you all you need to know about this sacred seed.</strong></p>
            <NavLink to="./products">
              <Button>show now</Button>
            </NavLink>
          </div>
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img src={image1} className="img-style" alt="img" />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
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

export default HeroSection;