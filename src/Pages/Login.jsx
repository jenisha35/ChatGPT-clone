import React, { useState, useRef, useContext, useEffect } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TfiMicrosoft } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { LuPhone } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { AuthcontextProvider } from "../GlobalContexts/Authcontext";

const Login = () => {
  const{auth, setAuth} = useContext(AuthcontextProvider)
  const [phone, setPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(false);
  const[showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const emailRef = useRef(null);

  
// useEffect(()=>{
//  auth?console.log("loggedin"):console.log("not logged in");

// },[auth])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pass) {
      setPass(true);
    } else {
      if (emailAddress && password) {
       const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password")
if (emailAddress === storedEmail && password === storedPassword) {
  setAuth(true)
  toast.success("Logged in successfully!");
  setEmailAddress("");
  setPassword("");
} else {
  setAuth(false)
  toast.error("Invalid credentials");
}


      }
    }
    
    
  };

  return (
    <div>
      <h2 className="mt-20 text-center font-semibold text-2xl mb-5 md:absolute md:left-4 md:top-2 md:mt-0 md:ml-0 cursor-pointer" onClick={()=>{navigate('/')}}>
        ChatGPT
      </h2>
      <h1 className="text-center font-semibold text-4xl md:mt-22">
        {!pass?"Welcome back":"Enter your password"}
      </h1>

      <article className="mt-10 flex items-center flex-col">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {phone ? (
            <div className="w-85 mt-5">
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputClass="!w-full !h-12 !pl-14 !border !border-[#D9D9D9] !rounded-lg"
                buttonClass="!border-[#D9D9D9]"
                dropdownClass="!z-50"
              />
            </div>
          ) : (
            <>
              <article className="h-16 w-85 relative">
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  className="peer pt-1.2 pl-5 border h-14 w-85 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12A480]"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-5 px-1 bg-white text-[#bdbaba] transition-all duration-200 ease-in-out
                    ${emailAddress.trim() !== "" ? "top-[-10px] text-sm text-[#12A480]" : "top-3"}
                    peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#12A480]`}
                >
                  Email Address
                </label>
                <p
                  className="absolute top-4 right-5 cursor-pointer text-[#12A480] hover:underline"
                  onClick={() => {
                    setPass(false);
                    setEmailAddress("");
                    setTimeout(() => {
                      emailRef.current?.focus();
                    }, 0);
                  }}
                >
                  Edit
                </p>
              </article>
            </>
          )}

          {pass && (
            <article className="mt-5 h-16 w-85 relative">
              <input
                id="password"
                type = {showPassword?"text":"password"}
                className="peer pt-1.2 pl-5 border h-14 w-85 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12A480]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-5 px-1 bg-white text-[#bdbaba] transition-all duration-200 ease-in-out
                  ${password.trim() !== "" ? "top-[-10px] text-sm text-[#12A480]" : "top-3"}
                  peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#12A480]`}
              >
                Password
              </label>
              <button className="absolute top-5 left-75" onClick={(e)=>{setShowPassword(!showPassword);e.preventDefault();}}>{showPassword?<FaEyeSlash />:<FaEye />}</button>
            </article>
          )}

          <button
            type="submit"
            className="cursor-pointer hover:bg-[#10a37ee7] bg-[#10A37F] h-14 w-85 rounded-lg mt-5 text-white font-semibold"
          >
            Continue
          </button>
        </form>

        <h2 className="mt-5">
          Don't have an account?{" "}
          <span
            className="hover:underline cursor-pointer text-[#10A37F] font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </h2>
        <h2 className="mt-5">OR</h2>

        <button
          className="cursor-pointer hover:bg-[#cad1cfe7] border border-[#D9D9D9] h-12 w-85 rounded-lg mt-5 flex items-center justify-center gap-2 text-[#333]"
          onClick={() => setPhone(!phone)}
        >
          {!phone ? <LuPhone /> : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#333]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM4.26834 6.31832L11.4233 11.3689C11.769 11.6129 12.231 11.6129 12.5767 11.3689L19.7317 6.31832C19.5491 6.12247 19.2889 6 19 6H5C4.71114 6 4.45089 6.12247 4.26834 6.31832ZM20 8.57698L13.7301 13.0028C12.6929 13.735 11.3071 13.735 10.2699 13.0028L4 8.57698V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V8.57698Z"
                fill="currentColor"
              />
            </svg>
          )}
          {phone ? "Continue with Email" : "Continue with Phone"}
        </button>

        <button className="cursor-pointer hover:bg-[#cad1cfe7] border border-[#D9D9D9] h-12 w-85 rounded-lg mt-5 flex items-center justify-center gap-2 text-[#333]">
          <FcGoogle />
          Continue with Google
        </button>
        <button className="cursor-pointer hover:bg-[#cad1cfe7] border border-[#D9D9D9] h-12 w-85 rounded-lg mt-5 flex items-center justify-center gap-2 text-[#333]">
          <TfiMicrosoft />
          Continue with Microsoft Account
        </button>
        <button className="cursor-pointer hover:bg-[#cad1cfe7] border border-[#D9D9D9] h-12 w-85 rounded-lg mt-5 flex items-center justify-center gap-2 text-[#333]">
          <FaApple className="text-lg" />
          Continue with Apple
        </button>

        <p className="mt-10 mb-4">
          <span className="text-sm text-[#12A480] hover:cursor-pointer hover:underline">
            Terms of Use
          </span>
          <span className="text-[#12A480]"> | </span>
          <span className="text-sm text-[#12A480] hover:cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </article>
    </div>
  );
};

export default Login;
