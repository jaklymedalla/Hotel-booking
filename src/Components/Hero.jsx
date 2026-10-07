import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6
    md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")]
    bg-no-repeat bg-cover bg-center h-screen'>
        <p>The Ultimate Hotel Experience</p>
        <h1>Discover Your Perfect Gateway Destination</h1>
        <p>Unparalled luxury and comfort await at the world's most exclusive hotels
        and resorts. Start your journey today.</p>
    </div>
  )
}

export default Hero