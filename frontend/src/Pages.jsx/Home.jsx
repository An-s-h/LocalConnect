import React from 'react'
import NavBar from '../Components/NavBar'
import Hero from '../Components/Hero'
import FeaturedBusinesses from '../Components/FeaturedBusinesses'
import '../index.css'
import WhyLocal from '../Components/WhyLocal'
const Home = () => {
  return (
    <>
    <NavBar/>
    <Hero/>
    <FeaturedBusinesses/>
    <WhyLocal/>
    </>
  )
}

export default Home
