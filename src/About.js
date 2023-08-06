import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from "./context/ProductContext";

const About = () => {
  const { myName } = useProductContext();
  const data = {
    name: "Pujari Ecommerce",
  };
  return (  
  <>
    {myName}
    <HeroSection myData={data} />
  </>
  )
}

export default About
