import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gptprovider } from '../GlobalContexts/Gptcontext'

const Gptbox = () => {
  const{gpt, setGpt} = useContext(Gptprovider)
  const navigate = useNavigate()
  return (
    <div className={` h-70 w-75  bg-white shadow-xl  rounded-2xl z-[999] absolute ${gpt?"bottom-18":"top-10"}  left-10 `} >
      <img src="../public/bg.jpg" alt="" className='h-30 w-[100%] rounded-t-2xl'/>
      <section className='mt-2'>
              <h1 className='pl-4 font-semibold text-lg '>Try advanced features for free</h1>
      <p className='font-thin text-center text-sm  p-1 mt-2'>Get smarter responses, upload files, create images, and more by logging in.</p>
      <ul className='flex m-3 gap-5'>
         <li >
            <button className="h-10 w-19 text-center border rounded-full bg-black text-white pt-0.5 cursor-pointer" onClick={()=>{navigate("/login")}}>Log in</button>
            </li>
          <li >
            <button className="h-10 w-19 text-center  rounded-full  pt-0.5 border-[#D9D9D9] border-2 cursor-pointer hover:bg-[#f3f0f0] " onClick={()=>{navigate("/register")}}>Sign up</button></li>
      </ul>
      </section>
      

    </div>
  )
}

export default Gptbox