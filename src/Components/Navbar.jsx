import React, { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Gptbox from "./Gptbox";
import { useNavigate } from "react-router-dom";
import { Gptprovider } from "../GlobalContexts/Gptcontext";
import { NewchatcontextProvider } from "../GlobalContexts/Newchatcontext";
import { AuthcontextProvider } from "../GlobalContexts/Authcontext";
import { LuMessageCircleDashed } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { TemperorychatcontextProvider } from "../GlobalContexts/Temperorychatcontext";
import { BiMessageRounded, BiMessageRoundedCheck } from "react-icons/bi";

const Navbar = () => {
   
  const{tempChat, setTempChat} = useContext(TemperorychatcontextProvider)
  const{auth, setAuth} = useContext(AuthcontextProvider)
  const{gpt, setGpt} = useContext(Gptprovider)
  const{newChat, setNewChat} = useContext(NewchatcontextProvider)

  const navigate = useNavigate()
  const[showGptbox, setShowGptbox] = useState(false)
  return (
    <div className="fixed flex justify-between w-[100vw] h-[70px] bg-white">
      <section>
        <ul className="flex mt-3 gap-3 ml-3 align-center">
            <li className="hover:bg-[#f3f0f0] hover:rounded-lg cursor-pointer"title="New Chat" onClick={()=>{setNewChat(true)}}>
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 24"
              color="#5D5D5D"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-xl-heavy"
            >
              <path
                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                fill="currentColor"
              ></path>
            </svg>
          </li>

{!auth&&(
   <li>
            <button className="flex items-center text-xl cursor-pointer hover:bg-[#f3f0f0] hover:rounded-lg  " onClick={()=>{setShowGptbox(!showGptbox);setGpt(false)}}>
              ChatGPT{" "}
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="#5D5D5D"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-md text-token-text-tertiary"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
            {showGptbox&&<Gptbox></Gptbox>}
          </li>
)}
         
        </ul>
      </section>

      <section>
        <ul className="flex gap-5 mr-4 align-center mt-2">
          {!auth?(<>
                  <li>
            <button className="h-10 w-19 text-center border rounded-full bg-black text-white pt-0.5 cursor-pointer" onClick={() => navigate('/login')}>Log in</button>
            </li>
          <li>
            <button className="h-10 w-19 text-center  rounded-full  pt-0.5 border-[#D9D9D9] border-2 cursor-pointer hover:bg-[#f3f0f0] " onClick={()=>{navigate("/register")}}>Sign up</button></li>
          <li className="mt-2 hover:bg-[#f3f0f0] hover:rounded-full ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="#5D5D5D"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-xl-heavy"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 9C11.6227 9 11.2926 9.2086 11.1215 9.52152C10.8564 10.0061 10.2488 10.184 9.76426 9.91899C9.27972 9.65396 9.10177 9.04632 9.36679 8.56178C9.87463 7.63331 10.8626 7 12 7C13.5147 7 14.5669 8.00643 14.8664 9.189C15.1676 10.3779 14.7101 11.763 13.3416 12.4472C13.1323 12.5519 13 12.7659 13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.0084 11.5603 11.1018 12.4472 10.6584C12.902 10.431 13.0188 10.0397 12.9277 9.6801C12.835 9.31417 12.5283 9 12 9Z"
                fill="currentColor"
              ></path>
              <path
                d="M13.1004 16C13.1004 16.6075 12.6079 17.1 12.0004 17.1C11.3929 17.1 10.9004 16.6075 10.9004 16C10.9004 15.3925 11.3929 14.9 12.0004 14.9C12.6079 14.9 13.1004 15.3925 13.1004 16Z"
                fill="currentColor"
              ></path>
            </svg>
          </li>
          </>
          ):(
            <>
              <li className="text-3xl cursor-pointer" onClick={()=>{setTempChat(!tempChat)}}>{tempChat?<BiMessageRoundedCheck />:<BiMessageRounded  />}</li>
            <li className="text-2xl cursor-pointer"><CgProfile /></li></>
          
          )}
    
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
