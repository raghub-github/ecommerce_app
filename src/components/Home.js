import React from 'react'
import styled from 'styled-components'

const Home = () => {
    return (
        <Wrapper className='test'>This is Home </Wrapper>
    )
};

const Wrapper = styled.section`
height: 100hv;
background-color:${({ theme }) => theme.colors.bg};`;

export default Home