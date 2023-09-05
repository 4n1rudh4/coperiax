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
        {state ? <div className="md:grid md:grid-cols-3 m-10  md:place-items-center">
            <div className="w-11/12 h-96 bg-slate-300 rounded-xl bg-hero-pattern">
                <div className="text-3xl font-bold m-2">Enter Your Details</div>

            </div>
            <div className="w-11/12 h-96 bg-slate-300 rounded-xl">

            </div>
            <div className="w-11/12 h-96 bg-slate-300 rounded-xl">

            </div>
        </div>: <div className="block w-fit p-2 bg-green-200 m-auto mt-10 mb-10 rounded"><div className="text-3xl font-bold">You are not Logged in.<a href="/signup"> Click here to <button className="hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full">Signup or Login</button></a></div></div>}
        <Footer/>
    </>

}

export default Landing;