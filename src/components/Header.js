import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import Logo from '../image/logo1.png'
// import Navbar from '../Navbar'


const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
      <img className="logo-size" style={{ height: "20%", width: "20%" }} src={Logo} alt="Logo" />
      </NavLink>
      <Nav />
      {/* <Navbar/> */}
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding:0 4.5rem;
  height: 10vh;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .logo-size{
        height: 50% !important;
        width: 50% !important;
    }
  }

  .logo {
    height: 5rem;
  }
`;
export default Header;