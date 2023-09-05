import React, { useState,useEffect   } from "react";
import Header from "../header";
import Footer from "../footer";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword,updateProfile,sendEmailVerification} from 'firebase/auth';
import {auth} from '../../firebase';

function Signup(){
    const[state,setTrue]=useState(true);
    const [username,setUser]=useState("");
    
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



    const navigate=useNavigate();
    const [values,setValues] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [error,setError]=useState("");
    const [submitdisable,setSubmitdisable]=useState(false);    
    function handlesub(){
        if (!values.name || !values.email || !values.password){
            setError("Fill All Fields Please")
            return ;
        }
        setError("");
        setSubmitdisable(true)
        createUserWithEmailAndPassword(auth,values.email,values.password).then(async(res)=>{
            console.log(res);
            const user=res.user;
            await updateProfile(user,{
                displayName:values.name,
            });
             sendEmailVerification(user)
            navigate('/login');
            setSubmitdisable(false)

        }).catch((err)=> {
            console.log("Error-",err)
            setSubmitdisable(false)
            setError(err.message)
    });
    }
    var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    return <>
        <Header date={date} name={username}/>

        { state ?
        <div className="block h-fit mt-2 mb-2 w-8/12 bg-green-100 rounded p-10 m-auto">
        <div className="text-2xl font-bold pb-4">Signup to AGROW</div>
            <div className="block  h-fit w-fit m-auto">
                
                <input className="block mb-2 border-2 rounded-full border-bg-white h-10 md:w-96 text-black w-fit bg-white" type="text" placeholder="Enter your Name" 
                onChange={(event)=>
                    setValues((prev)=> ({...prev,name:event.target.value}))
                }></input>
                    <input className="block mb-2 border-2 rounded-full border-bg-white h-10 md:w-96 w-fit text-black bg-white" type="text" placeholder="Enter your Email" onChange={(event)=>
                    setValues((prev)=> ({...prev,email:event.target.value}))
                }></input>
                    <input className=" border-2 rounded-full border-bg-white h-10 md:w-96 w-fit text-black bg-white" type="password" placeholder="Enter your Password" onChange={(event)=>
                    setValues((prev)=> ({...prev,password:event.target.value}))
                }></input>
                    <button type="submit" disabled={submitdisable} className="disabled:bg-slate-500 hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full" onClick={handlesub}>Signup</button>
                    <p className="flex font-medium flex-nowrap justify-center text-red-500">{error}</p>
            <div>Already Logged in? <a href="/login" className="text-green-800 font-bold " >Login</a></div>
            </div>
        </div>

        : <div className="bg-green-200 h-fit p-10 md:w-3/12 w-fit font-bold block m-auto mt-2 mb-2 rounded">Already Logged in<br/>
        <button type="submit" className="disabled:bg-slate-500 hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded" ><a href="/">Return to Home</a></button>
        </div>}




        <Footer/>
    </>
}



export default Signup;