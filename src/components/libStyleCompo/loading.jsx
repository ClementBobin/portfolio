import './loader.scss'
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChangingTextWrapper = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const ChangingText = () => {
  const texts = ["We are getting your content", "Changing Text", "Another Text", "More Text"];
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
    <section>
      <div class="container">
          <div class="baton-0"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-1"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-2"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-3"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-4"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-5"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-6"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-7"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-8"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-9"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-10"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-11"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-12"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-13"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-14"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-15"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-16"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-17"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-18"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-19"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-20"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-21"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-22"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-23"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-24"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-25"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-26"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-27"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-28"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-29"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-30"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-31"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-32"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-33"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-34"><div class="metronome"><div class="baton"></div></div></div>
          <div class="baton-35"><div class="metronome"><div class="baton"></div></div></div>
      </div>
      <div>
        <ChangingText />
      </div>
    </section>
  );
};

export default Loading;