import React from 'react';
// import styled from "styled-components";
import HeroSection from "./components/HeroSection";
import Trusted from './components/trusted';
import Services from './components/Services';
import FeatureProduct from './components/FeatureProduct';

const Home = () => {
  const data = {
    name: "Pujari store",
  };

  return <>
    <HeroSection myData={data} />
    <FeatureProduct/>
    <Services />
    <Trusted />
  </>;
};

export default Home;