import React, { useState, useEffect, useRef } from "react";
import { logo, menu, close } from '../assets';
import { Prompt } from '../constants/response';
import { send } from '../assets';
import { Question, Responses } from '../constants/response';

const findQuestionResponse = (userInput) => {
  for (let i = 0; i < Question.length; i++) {
    let validWords = 0; // Reset validWords for each question
    if (Array.isArray(Question[i])) {
      for (let j = 1; j < Question[i].length; j++) {
        if (Question[i][0] === "combine") {
          if (Question[i][j][0] === "or") {
            for (let k = 1; k < Question[i][j].length; k++) {
              if (userInput.includes(Question[i][j][k])) {
                validWords++;
              }
            }
          } else if (!userInput.includes(Question[i][j])) {
            break;
          } else {
            validWords++;
          }
          if (Question[i].length - 1 === validWords) {
            return Responses[i];
          }
        } else if (userInput.includes(Question[i][j])) {
          return Responses[i];
        }
      }
    } else if (userInput.includes(Question[i])) {
      return Responses[i];
    }
  }
  return null; // Return null if no specific response is found
};

const Chat = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [showChathelp, setShowChathelp] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [TextPrompt, setTextPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");

  const chatBodyRef = useRef(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const renderUserMessage = () => {
    if (userInput.trim() === "") return;

    const newMessage = { content: userInput, type: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");

    setTimeout(() => {
      const response = getChatbotResponse(userInput);
      const chatbotMessage = { content: response, type: "chatbot" };
      setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
      setScrollPosition();
    }, 600);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputKeyUp = (event) => {
    if (event.keyCode === 13 || event.type === "click") {
      renderUserMessage();
    }
  };

  const getChatbotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    const questionResponse = findQuestionResponse(lowerCaseInput);
    console.log(questionResponse);

    let response;

    if (lowerCaseInput.includes("help")) {
      response = "Here some question you can ask me."
      setShowChathelp((prevShowChathelp) => !prevShowChathelp);
      return response;
    } if (questionResponse) {
      response = questionResponse;
    } else {
      response = "Sorry, I didn't understand that. Please try something else.";
    }

    if (Array.isArray(response)) {
      const randomIndex = Math.floor(Math.random() * response.length);
      response = response[randomIndex];
    }
    
    return response;
  };

  const setScrollPosition = () => {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };

  const PromptDisplay = (question) => {
    setTextPrompt(question);
    setUserInput(question);
  };

  const showCategory = (type) => {
    if (showSelector === false) {
    document.getElementById(type + "-question").style.display = "block";
    setShowSelector(true);
    } else {
      document.getElementById(type + "-question").style.display = "";
      setShowSelector(false);
    }
  };

    // Create an object with unique type values as keys and question in their corresponding type
    const promptsByType = Prompt.reduce((acc, prompt) => {
      if (!acc[prompt.type]) {
        acc[prompt.type] = [];
      }
      acc[prompt.type].push(prompt.question);
      return acc;
    }, {});

      const uniquePrompts = Prompt.reduce((acc, prompt) => {
        if (!acc[prompt.type]) {
          acc[prompt.type] = prompt;
        }
        return acc;
      }, {});
  


  return (
    <>
      {showChatbox && (
              <div className={`fixed top-0 left-0 flex flex-row resize shadow-[0_0_15px_0_black] z-[50] h-[420px]`}>
                <div className='w-[350px] flex flex-col flexrounded border-4 border-solid border-[#915eff] bg-black-100 '>
                  <div className='h-[60px] flex items-center px-[30px] bg-black text-white'>
                    <div className='h-[35px] w-[35px] shadow-[0_0_10px_0_black]'>
                      <img src={logo} alt="cwt" />
                    </div>
                    <div className='pl-[10px]'>Let's Chat</div>
                  </div>
                  <div className='flex-[1] flex flex-col py-[8px] px-[10px] items-center overflow-y-auto overflow-x-hidden max-h-[calc(100% - 120px)]' ref={chatBodyRef}>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={message.type === "chatbot" ? "bg-[#915eff] self-start text-white m-[5px] max-w-[100%] rounded-[10px] p-[8px]" : "bg-white self-end text-black m-[5px] max-w-[100%] rounded-[10px] p-[8px]"}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                  <div className='h-[60px] flex items-center border-t-[1px] border-solid border-[#ccc] px-[10px]'>
                        <div className='w-full h-full'>
                            <input 
                              type="text" 
                              className='w-full h-full rounded flex-1 border-none outline-0 leading-[30px] caret-white bg-transparent ' 
                              placeholder="Type here"         
                              id="txtInput"
                              value={userInput}
                              onChange={handleInputChange}
                              onKeyUp={handleInputKeyUp}
                            />
                        </div>
                        <div className='pl-2'>
                            <img src={send} alt="send" onClick={handleInputKeyUp} className='h-[20px] w-[20px] cursor-pointer' />
                      </div>
                  </div>
                </div>
                {showChathelp && (
                  <div className={`h-[420px] ${showSelector || query ? "w-auto" : "w-[250px]"}`}>
                    <input type="search" onChange={handleSearch} value={query} placeholder="Search" className="w-full h-[30px]" />
                    <div className='w-auto backdrop-blur flex flex-wrap content-around overflow-y-auto'>
                      {Object.entries(uniquePrompts).map(([type], index) => (
                        <div
                        id={type}
                        key={index}
                        className={`w-[250px] h-[50px] rounded-md bg-slate-600 items-center justify-center cursor-pointer flex ${showSelector || query ? "hidden" : ""}`}
                        onClick={() => showCategory(type)}
                        >
                      
                          <img src={logo} alt='logo' className='w- h-full object-contain' />
                          <small className="absolute">{type}</small>
                        </div>
                      ))}
                    </div>
                    {Object.entries(promptsByType).map(([type, questions], index) => (
                      <div id={type + "-question"} key={index} className={`${query ? "" : "hidden"} max-h-[390px] overflow-y-auto bg-purple-950 border-solid border-8 border-purple-950`}>
                        <h1>{type}</h1>
                        <img src={close} alt="close" className="position relative bottom-5 left-[95%] cursor-pointer" onClick={() => showCategory(type)} />
                        <div className="bg-purple-600">
                        {questions
                          .filter(question => question.toLowerCase().includes(query.toString().toLowerCase()))
                          .map((question, idx) => (
                            <p key={idx} onClick={() => PromptDisplay(question)} className="cursor-pointer">{question}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
      )}
      <div
        className='h-[35px] w-[35px] rounded-lg z-[50] fixed right-0 bottom-0'
        onClick={toggleChatbox}
      >
        <img src={logo} alt="" />
      </div>
    </>
  )
}

export default Chat;