import React, { useContext, useEffect, useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { CiGlobe } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import Gptbox from "./Gptbox";
import { Gptprovider } from "../GlobalContexts/Gptcontext";
import { RiVoiceprintLine } from "react-icons/ri";
import { MdOutlineTextSnippet } from "react-icons/md";
import { TfiGift } from "react-icons/tfi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaArrowUp, FaLaptopCode } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { IoCopyOutline } from "react-icons/io5";
import { NewchatcontextProvider } from "../GlobalContexts/Newchatcontext";
import { TemperorychatcontextProvider } from "../GlobalContexts/Temperorychatcontext";

const Body = () => {
  const suggestionPool = [
    {
      icon: <MdOutlineTextSnippet className="mr-2 text-[#EA8444]" />,
      label: "Summarize text",
    },
    { icon: <TfiGift className="mr-2 text-[#7AD1EC]" />, label: "Surprise me" },
    {
      icon: <HiOutlineLightBulb className="mr-2 text-[#E2C541]" />,
      label: "Brainstorm",
    },
    {
      icon: <FaLaptopCode className="mr-2 text-[#6795C9]" />,
      label: "Generate code",
    },
    {
      icon: <CiGlobe className="mr-2 text-[#A0AEC0]" />,
      label: "Data analysis",
    },
    { icon: null, label: "Explain a concept" },
    { icon: null, label: "Translate this" },
    { icon: null, label: "Write a poem" },
  ];

  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState(false);
  const { gpt, setGpt } = useContext(Gptprovider);
  const [showGptbox, setShowGptbox] = useState(false);
  const [showmore, setshowmore] = useState(true);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const bottomRef = useRef(null);
  const [copy, setCopy] = useState(false);
  const{newChat, setNewChat} = useContext(NewchatcontextProvider)
const{tempChat, setTempChat} = useContext(TemperorychatcontextProvider)

  useEffect(() => {
    const buttons = document.querySelectorAll(".copyButton");
    const handleCopy = (e) => {
      const btn = e.currentTarget;
      const messageDiv = btn.closest(".messageToCopy");
      if (!messageDiv) return;
      const text = messageDiv.innerText || messageDiv.textContent || "";

      navigator.clipboard.writeText(text);
      const originalIcon = btn.innerHTML;
      btn.innerHTML =
        "<svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5 text-green-600' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>";

      setTimeout(() => {
        btn.innerHTML = originalIcon;
      }, 2000);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", handleCopy);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("click", handleCopy);
      });
    };
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getRandomSuggestions = () => {
    const shuffled = [...suggestionPool].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 4));
  };

  useEffect(() => {
    getRandomSuggestions();
  }, []);

  const showAll = () => {
    setSuggestions(suggestionPool);
  };

  const ai = new GoogleGenAI({
    apiKey: "YOUR API KEY",
  });

  async function main(prompt) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      let newResponse = "";
      let newResponseString = "";
      let newResponseString2 = "";
      let newResponseString3 = "";
      const text = await response.text;
      const responseArray = text.split("**");
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse +=
            "<h1 class = 'text-xl font-semibold mb-2'>" +
            responseArray[i] +
            "</h1>";
        }
      }

      const newResponseArray = newResponse.split("```");
      for (let i = 0; i < newResponseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponseString += newResponseArray[i];
        } else {
          const words = newResponseArray[i].split("\n");
          const firstWord = words[0];
          const restOfString = words.slice(1).join(" ");

          newResponseString +=
            "<div class='messageToCopy relative h-fit w-full bg-[#F9F9F9] p-5 border border-[#DDDDDD] rounded-lg text-[#C89320]'>" +
            "<span class='absolute top-1 left-1 text-xs font-light text-[#5D5D5D]'>" +
            firstWord +
            "</span>" +
            "<button class='copyButton cursor-pointer absolute top-1 right-1'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5 text-[#5D5D5D]' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2'/><rect x='8' y='8' width='12' height='12' rx='2' ry='2'/></svg>" +
            "</button>" +
            restOfString +
            "</div>";
        }
      }

      const newResponseArray2 = newResponseString.split("`");
      for (let i = 0; i < newResponseArray2.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponseString2 += newResponseArray2[i];
        } else {
          newResponseString2 += "<b>" + newResponseArray2[i] + "</b>";
        }
      }

      const newResponseArray3 = newResponseString2.split("*");
      for (let i = 0; i < newResponseArray3.length; i++) {
        newResponseString3 += newResponseArray3[i];
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: "bot",
          text: newResponseString3,
        };
        return newMessages;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: "bot",
          text: "Something went wrong.",
        };
        return newMessages;
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = input;
    if (!input.trim()) return;
    setHideSuggestions(true);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { type: "user", text: userMessage },
      { type: "bot", text: "Thinking..." },
    ]);

    main(userMessage);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
  if (newChat) {
    setMessages([]);
    setNewChat(false);
    setHideSuggestions(false);
  }
}, [newChat]);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {/* Input text */}
   {!hideSuggestions && (
  tempChat ? (
    <h1 className="text-3xl mt-25 text-center  w-[500px] mx-auto">Temporary Chat <span className="block text-lg mt-5">This chat won't appear in history, use or update ChatGPT's memory, or be used to train our models. For safety purposes, we may keep a copy of this chat for up to 30 days.</span></h1>
  ) : (
    <h1 className="text-3xl mt-45 text-center">What can I help with?</h1>
  )
)}


      {/* Output */}
      {hideSuggestions && (
        <div
          className="flex-1 mt-16 mb-[110px] px-4 overflow-y-auto custom-scroll-hide
 w-full flex justify-center"
        >
          <div className="relative w-full max-w-[767px] space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`   w-fit  max-w-[450px]  whitespace-pre-wrap break-words overflow-auto  mb-10 ${
                  msg.type === "user"
                    ? " ml-auto bg-[#F4F4F4] rounded-3xl p-3 shadow-xl"
                    : "mr-auto leading-loose"
                }`}
                ref={bottomRef}
              >
                {msg.text === "Thinking..." ? (
                  <Loader />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        className={`${
          hideSuggestions && "fixed"
        } bottom-0 left-0 w-full  z-50 px-4 py-2`}
        onSubmit={handleSubmit}
      >
        <div className="relative max-w-[763px] mx-auto h-[102px] z-0">
          <textarea
            className={`inputbox  h-full w-full rounded-4xl shadow-xl border border-[#E5E5E5] pl-6 pt-4 focus:outline-none ${
              hideSuggestions ? "mt-0" : "mt-8"
            }`}
            placeholder="Ask anything"
            value={input}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="relative w-full bg-white h-4 bottom-12 ">
            <button
              type="button"
              className="text-[#5D5D5D] absolute left-4 border w-24 cursor-pointer border-[#E5E5E5] rounded-full h-8 pl-1 pr-4 shadow-2xl flex items-center gap-1"
            >
              <CiGlobe /> Search
            </button>

            <button
              type="button"
              className="text-[#5D5D5D] absolute left-36 border w-24 cursor-pointer border-[#E5E5E5] rounded-full h-8 pl-1 pr-4 shadow-2xl flex items-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                setShowGptbox(!showGptbox);
                setGpt(true);
              }}
            >
              <GoLightBulb /> Reason
            </button>

            <button
              type="submit"
              className={`bg-black cursor-pointer text-white absolute right-4 bottom-0.5 border rounded-full ${
                input ? "w-10" : "w-24"
              } h-10 shadow-2xl flex items-center justify-center`}
            >
              {input === "" ? (
                <>
                  <RiVoiceprintLine className="mr-1" /> Voice
                </>
              ) : (
                <FaArrowUp />
              )}
            </button>
          </div>

          {/* Suggestions */}
          {!hideSuggestions && (
            <div className="flex flex-wrap justify-center gap-4 mt-5 w-full max-w-[850px]">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(item.label)}
                  className="text-[#5D5D5D] border cursor-pointer border-[#E5E5E5] rounded-full h-10 px-4 shadow-2xl flex items-center"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              {showmore && (
                <button
                  className="text-[#5D5D5D] border cursor-pointer border-[#E5E5E5] rounded-full h-10 px-4 shadow-2xl"
                  onClick={() => {
                    showAll();
                    setshowmore(!showmore);
                  }}
                >
                  More
                </button>
              )}
            </div>
          )}
        </div>
      </form>

    
 
    </div>
  );
};

export default Body;
