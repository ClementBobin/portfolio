import React from 'react'
import Encryption from '../components/portfolio/main/Encryption'
import Transition from '../components/portfolio/main/transition'
import Transition2 from '../components/portfolio/main/transition2'
import Hero from '../components/portfolio/main/Hero'

// The Test component for rendering a test page
function Test() {
  return (
    <>
      <Hero />
      <div className='bg-[#030014] '>
          <div id='hack or construct'>&lt;test /&gt;</div>
          <div id='comment'>// see more</div>
          <div id='nav'>.find()</div>
          <div id='part'>&lt;wrapper id="about" /&gt;</div>
          <video src="" id='auto play + https://robinpayot.com/'></video>
          <Encryption />
          <Transition />
          <Transition2 />
      </div>
    </>
  )
}

export default Test