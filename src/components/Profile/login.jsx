import React, { useState ,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase';
import {useNavigate} from "react-router-dom";

function Login(){
    const Navigate=useNavigate();
    const [values,setValues] = useState({
        email : "",

        password : ""
    })
    const[state,setTrue]=useState(true);
    const [username,setUser]=useState("");
    const [error,setError]=useState("");
    const [submitdisable,setSubmitdisable]=useState(false);    
    function handlesub(){
        if ( !values.email || !values.password){
            setError("Fill All Fields Please")
            return ;
        }
        setError("");
        setSubmitdisable(true)
        signInWithEmailAndPassword(auth,values.email,values.password).then(async(res)=>{
            console.log(res);
            setSubmitdisable(false)
            Navigate("/dashboard")

        }).catch((err)=> {
            console.log("Error-",err)
            setSubmitdisable(false)
            setError(err.message)
    });
    }

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setTrue(false)
                setUser(user.displayName)
            } else{
                console.log("");
                setUser("")
            }
        })
    })
    var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    return <>
        <Header date={date} name={username}/>
        {state ? <div className="block h-fit mt-2 mb-2 w-8/12 bg-green-100 rounded p-10 m-auto">
        <div className="text-2xl font-bold pb-4">Login to AGROW</div>
        <hr className="block pb-4 m-auto w-11/12 border-2 border-bg-black"/>
            <div className="block  h-fit w-fit m-auto">
                
                    <input className="block mb-2 border-2 rounded-full border-bg-white h-10 md:w-96 w-fit text-black bg-white" type="text" placeholder="Enter your Email" onChange={(event)=>
                    setValues((prev)=> ({...prev,email:event.target.value}))
                }></input>
                    <input className=" border-2 rounded-full border-bg-white h-10 md:w-96 w-fit text-black bg-white" type="password" placeholder="Enter your Password" onChange={(event)=>
                    setValues((prev)=> ({...prev,password:event.target.value}))
                }></input>
                    <button disabled={submitdisable} type="submit" className=" hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full" onClick={handlesub}>Login</button>
                    <p className="flex font-medium flex-nowrap justify-center text-red-500">{error}</p>
                    <div>Not a User? <a href="/signup" className="text-green-800 font-bold">Signup</a></div>
                    <div>Forgot Password? <a href="/forgot" className="text-green-800 font-bold">Reset</a></div>
            </div>
        </div> : Navigate("/dashboard")}
        <Footer  />
    </>
}



export default Login;