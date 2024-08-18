import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Feature from "../components/home/Feature";
import Pricing from "../components/home/Pricing";
import Hero from "../components/home/Hero";
// import SeoHead from "../components/home/SeoHead";
function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Pricing />
      <Footer />
    </>
  );
}

export default Home;
