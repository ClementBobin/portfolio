import './loader.scss'
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChangingTextWrapper = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const ChangingText = () => {
  const texts = ["Brace yourself! Entering the internet's fun zone. Don't forget your virtual popcorn!", "Hold onto your pixels! This website is about to blow your mind, or at least tickle your funny bone.", "Welcome to the virtual circus! Prepare for a wild ride of laughter and web wonders.", "Caution: Puns ahead! Brace yourself for a pun-derful experience as you navigate this site."];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(texts[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index and text from the array
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setIsVisible(false);

      // Set a timeout to update the text and make it visible again after the transition
      setTimeout(() => {
        setText(texts[index]);
        setIsVisible(true);
      }, 500); // Half of the transition duration (in milliseconds)
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [index, texts]); // Include index and texts in the dependency array

  return <ChangingTextWrapper visible={isVisible}>{text}</ChangingTextWrapper>;
};

const Loading = () => {
  return (
    <section className='loader'>
      <div className="container">
          <div className="baton-0"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-1"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-2"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-3"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-4"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-5"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-6"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-7"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-8"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-9"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-10"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-11"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-12"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-13"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-14"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-15"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-16"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-17"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-18"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-19"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-20"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-21"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-22"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-23"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-24"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-25"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-26"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-27"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-28"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-29"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-30"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-31"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-32"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-33"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-34"><div className="metronome"><div className="baton"></div></div></div>
          <div className="baton-35"><div className="metronome"><div className="baton"></div></div></div>
      </div>
      <div>
        <ChangingText />
      </div>
    </section>
  );
};

export default Loading;