import React, { useState, useRef, useContext } from "react";
import toast from "react-hot-toast";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TfiMicrosoft } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AuthcontextProvider } from "../GlobalContexts/Authcontext";

const Register = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(false);
  const[showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const{auth, setAuth} = useContext(AuthcontextProvider)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pass) {
      setPass(true);
    } else {
      if (emailAddress && password) {
        toast.success("Registered successfully!")
        localStorage.setItem("email",emailAddress)
        localStorage.setItem("password", password)
        setEmailAddress("")
        setPassword("")
        setAuth(false)
        
      }
    }
  };

  return (
    <div>
      <h2 className="mt-20 text-center cursor-pointer font-semibold text-2xl mb-5 md:absolute md:left-4 md:top-2 md:mt-0 md:ml-0" onClick={()=>{navigate('/')}}>
        ChatGPT
      </h2>
      <h1 className="text-center font-semibold text-4xl md:mt-22">
        Create your account
      </h1>
        {pass&&(<p className="text-center font-base  mt-5 text-[#C6C6C6]">Set your password for OpenAi to continue</p>
        )}
      <article className="mt-10 flex items-center flex-col">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
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
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </h2>
        <h2 className="mt-5">OR</h2>



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

export default Register;
