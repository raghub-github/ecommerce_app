import React from 'react';
// import styled from "styled-components";
import HeroSection from "./components/HeroSection";

const Home = () => {
  const data = {
    name: "Pujari store",
  };

  return <>
    <HeroSection myData={data} />
  </>;
};

export default Home;