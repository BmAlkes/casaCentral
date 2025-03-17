import React, { useEffect, useState } from 'react'
import aboutImg from '../assets/about.jpg'
import { RiDoubleQuotesL } from 'react-icons/ri'
import CountUp from 'react-countup'

const About = () => {

    const statistics =[
        {label:"Happy Clients", value: 12},
        {label:"Differents Cities", value: 60},
        {label:"Projects Completed", value: 45},
    ,
    ]

    const [isVisible, setIsVisible] = useState(false)
    useEffect(()=>{
        const handleScroll = () =>{
            const aboutSection = document.getElementById('about')
            if(aboutSection){
                const top = aboutSection.getBoundingClientRect().top;
                const isVisible = top < window.innerHeight - 100;
                setIsVisible(isVisible)
            }
        }
        window.addEventListener('scroll',handleScroll)

        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])
  return (
    <section className='max-padd-container py-16 xl:py-28' id="about">
        {/* container */}
        <div className='flex flex-col xl:flex-row gap-10'>
          {/* left side */}
          <div className='flex-1 relative '>
            <img src={aboutImg} alt="" className='rounded-3xl rounded-tr-[155px] w-[488px]' />
            <div className='bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col'>
                <span className='relative bottom-8 p-4 shadow-md bg-white h-12 w-12 flex items-center rounded-full '><RiDoubleQuotesL className='text-2xl'/></span>
                <p className='text-center relative bottom-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem perferendis sit suscipit excepturi odio modi officiis eaque incidunt voluptatibus vel obcaecati, cum eius natus dolores ea explicabo dolorum quas debitis.</p>
            </div>
          </div>
          {/* right side */}
          <div className='flex-1 flex justify-center flex-col'>
            <span className='medium-18'>Unveilling Our Journey</span>
            <h2 className='h2'>Our Commitment Crafting Extraordinary Real Estate Experiences</h2>
            <p className='py-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto maiores enim commodi quam accusamus, incidunt dolores magnam soluta. Eius asperiores repellat culpa deleniti quisquam animi hic quasi debitis amet quidem?</p>
            {/* static container */}
            <div className='flex flex-wrap gap-4'>
                {statistics.map((statistic, index)=>(
                    <div key={index} className='bg-primary p-4 rounded-lg'>
                        <div className='flex items-center gap-1'>

                        <CountUp start={isVisible ? 0 : null} end={statistic.value} duration={10} delay={3}>
                            {({countUpRef})=>(
                                <h3 ref={countUpRef} className='text-2xl font-semibold'></h3>
                            )}
                        </CountUp>
                        <h4 className='bold-22'>K+</h4>
                            </div>
                        <p>{statistic.label}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
    </section>
  )
}

export default About