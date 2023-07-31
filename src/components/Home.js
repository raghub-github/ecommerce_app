import React from 'react'
import styled from 'styled-components'

const Home = () => {
    return (
        <Wrapper className='test'>This is Home </Wrapper>
    )
};

const Wrapper = styled.section`
background-color:${({ theme }) => theme.colors.bg};
height:20rem;
width:20rem;`;

export default Home