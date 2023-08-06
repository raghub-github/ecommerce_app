import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <Wrapper>
                <section className="contact-short">
                    <div className="grid styles1 grid-two-column" >
                        <div>
                            <h3>Ready to get started?</h3>
                            <h3>Talk to us today</h3>
                        </div>

                        <div>
                            <Button className="btn hireme-btn">
                                <NavLink to="/contact"> Get Started </NavLink>
                            </Button>
                        </div>
                    </div>
                </section>
                {/* footer section */}

                <footer>
                    <div className="styles cont grid grid-four-column">
                        <div className="footer-about cont1 style">
                            <h3 style={{ color: "rgb(252 255 235)" }}><strong>Pujari Store</strong></h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
                        </div>
                        <div className="style cont1">
                            <h3 style={{ color: "rgb(252 255 235)" }}><strong>Subscribe to get important updates</strong></h3>
                            <form className="style" action="#">
                                <input type="email" name="email" placeholder="YOUR E-MAIL" />
                                <input type="submit" value="subscribe" />
                            </form>
                        </div>
                        <div className="footer-social style cont1">
                            <h3 style={{ color: "rgb(252 255 235)" }}><strong>Follow Us</strong></h3>
                            <div className="footer-social--icons ">
                                <div>
                                    <FaDiscord className="icons" />
                                </div>
                                <div>
                                    <FaInstagram className="icons" />
                                </div>
                                <div>
                                    <a
                                        href="pujari.com"
                                        target="_blank" rel="noreferrer">
                                        <FaYoutube className="icons" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="style">
                            <h3 style={{ color: "rgb(252 255 235)" }}><strong>Call Us</strong></h3>
                            <a href="tel:9614271744"><h3>+91 9614271744</h3></a>
                        </div>
                    </div>

                    <div className="footer-bottom--section">
                        <hr />
                        <div className="container styles grid-two-column ">
                            <p>
                                @{new Date().getFullYear()} PujariStore. All Rights Reserved
                            </p>
                            <div className="styles">
                                <p>PRIVACY POLICY</p>
                                <p>TERMS & CONDITIONS</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }
  .style{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
  }
  .styles{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10rem;
  }
  .styles1{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:30rem;
  }
  .styles2{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10rem;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 14rem 0 0rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 2rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
      
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;
     

      .grid div:last-child {
        justify-self: center;
      }
    }

    .cont{
        width: 100%;
        padding: 0rem 1rem;
        
    }
    .cont1{
        margin-bottom: 7rem;
        margin-top: 2rem;
    }
    .styles1{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:2rem;
        flex-direction: column;
      }
    .styles{
        display: inline-block;
        text-align:center;
        justify-self: center;
      }

    footer {
      padding: 2rem 0 1rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;

    }
  }
`;

export default Footer;