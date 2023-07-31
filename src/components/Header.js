import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../image/pujari_logo.png'
import Nav from './Nav';

const Header = () => {
    return (
        <MainHeader>
            <NavLink to="/">
                <img style={{height:'10%', width:"10%"}} src={Logo} alt="Logo" />
            </NavLink>
            <Nav/>
        </MainHeader>
    )
};

const MainHeader = styled.header`
padding: 0 4.8rem;
height: 10vh;
background-color: ${({ theme }) => theme.colors.bg};
display: flex;
justify-content: space-between;
align-items: center;
position: relative;

.logo{
    height: 5rem;
}
`
export default Header
