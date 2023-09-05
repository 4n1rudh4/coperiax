import React,{useEffect,useState} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';

function Ins(){
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
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
        <Header name={username} date={date}/>
        <div className="bg-green-200 border-2 rounded-lg h-fit w-11/12 mt-2 mb-2 m-auto">
halo
        </div>
        <Footer/>
    </>

}

export default Ins;