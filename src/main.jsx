import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import createRoute from "./Routes/Mainroutes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Authcontext from "./GlobalContexts/Authcontext";
import Gptcontext from "./GlobalContexts/Gptcontext";
import Newchatcontext from "./GlobalContexts/Newchatcontext";
import Temperorychatcontext from "./GlobalContexts/Temperorychatcontext";



createRoot(document.getElementById("root")).render(
    <>
   
          <Authcontext>
             <Gptcontext>
            <Newchatcontext>
                <Temperorychatcontext>
        <Toaster />
<RouterProvider router={createRoute}>
    <App></App>
</RouterProvider>
</Temperorychatcontext>
</Newchatcontext>
    </Gptcontext>
    </Authcontext>



  

    </>

)
