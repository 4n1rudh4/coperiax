import React,{useState,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';


function Landing(){
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const[state,setTrue]=useState(false);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setTrue(true)
                
            } else{
                console.log("");
            }
        })
    })
    const [username,setUser]=useState("");
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user.displayName)
            } else{
                setUser("")
                console.log(user);
            }
        })
    })

    return <>
         <Header date={date} name={username}/>
        <div className="text-3xl flex md:justify-center w-full m-4 font-medium">Dashboard</div>
        
        {state ? <div className="block md:grid md:grid-cols-2 md:place-items-center">
       
            <div className="w-9/12 md:h-80 h-fit p-6 md:hover:bg-green-100 m-2 bg-slate-300 rounded-xl md:bg-hero-pattern">
                <div className="text-3xl font-bold m-2">Your Info</div>

            </div>
            <a href="/ins">
            <div className="w-11/12 md:h-80 h-fit p-2 md:hover:bg-green-100 m-2 bg-slate-300 rounded-xl bg-prediction-pattern">
                <div className="text-3xl font-bold m-2">Get Suitable Crop Recommendation</div>

            </div></a>
        </div>: <div className="block w-fit p-2 bg-green-200 m-auto mt-10 mb-10 rounded"><div className="text-xl font-medium">You are not Logged in.<a href="/signup"> Click here to <button className="hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full">Signup or Login</button></a></div></div>}
        <Footer  />
    </>

}

export default Landing;