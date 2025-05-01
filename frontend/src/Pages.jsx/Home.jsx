import React from 'react'
import NavBar from '../Components/NavBar'
import Hero from '../Components/Hero'
import FeaturedBusinesses from '../Components/FeaturedBusinesses'
import '../index.css'
import WhyLocal from '../Components/WhyLocal'
import TrendingDeals from '../Components/TrendingDeals'
import Footer from '../Components/Footer'
import RecommendedBusinesses from '../Components/RecommendedBusinesses '
const Home = () => {
  return (
    <>
    <NavBar/>
    <Hero/>
    <RecommendedBusinesses/>
    <WhyLocal/>
    <Footer/>
    </>
  )
}

export default Home
