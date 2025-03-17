import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Properties from '../components/Properties'
import Blog from '../components/Blog'
import bannerImg from '../assets/banner.png'

const Home = () => (
  <main>
    <Hero/>
    <About/>
    <Properties/>
    <Blog/>
    <div className='max-padd-container py-16 overflow-hidden'>
      <img src={bannerImg} alt="banner Turn your dream house into a reality." />
    </div>
  </main>
)

export default Home