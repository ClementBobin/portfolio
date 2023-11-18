import React from 'react'
import Encryption from '../components/main/Encryption'
import StarBackground from '../components/canvas/StarBackground'
import Transition from '../components/main/transition'
import Transition2 from '../components/main/transition2'
import Hero from '../components/main/Hero'

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
          <StarBackground />
      </div>
    </>
  )
}

export default Test