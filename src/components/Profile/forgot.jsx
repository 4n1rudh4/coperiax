import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";


function Login(){
    const [values,setValues] = useState({
        email : "",
    })
    const [filled,isFilled]=useState(true);
    const [error,setError]=useState("");

    function handlesub(){
        if (!values.email){
            setError("Fill All Fields Please")
            return ;
        }
        sendPasswordResetEmail(auth,values.email).catch((err)=> {
            console.log("Error-",err)
            setError(err.message)
    });;
        setError("");
        isFilled(false);
        setTimeout(() => {
            
          }, 60000);
        
    }

    var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    return <>
        <Header date={date}/>
        {filled ? <div className="block h-fit mt-2 mb-2 w-8/12 bg-green-100 rounded p-10 m-auto">
        <div className="text-2xl font-bold pb-4">Forgot Password</div>
            <div className="block  h-fit w-fit m-auto">
                
                    <input className="block mb-2 border-2 rounded-full border-bg-white h-10 md:w-96 w-fit text-black bg-white" type="text" placeholder="Enter your Email" onChange={(event)=>
                    setValues((prev)=> ({...prev,email:event.target.value}))
                }></input>
                    <button type="submit" onClick={handlesub} className=" hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full">Send Reset Link</button>
                    <p className="flex font-medium flex-nowrap justify-center text-red-500">{error}</p>
                    <div>Not a User? <a href="/signup" className="text-green-800">Signup</a></div>
            </div>
        </div> :<div className="flex justify-center p-10 text-lg font-bolds"><div className="md:w-4/12 h-fit w-fit bg-green-200">Link for you Reset Password has been sent in you Email Address. Please check your Inbox.
        <br/>Return to <span className="text-green-700 font-bold"><a href="/">Home</a></span> </div></div>}
        <Footer/>
    </>
}



export default Login;