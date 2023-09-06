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
        <div className="flex text-2xl font-bold w-full justify-center p-2">Instructions</div>
        <ul>
            <li>
                Create 
            </li>
        </ul>
        https://www.indiamart.com/proddetail/soil-testing-kit-npk-ph-11190569148.html
        </div>
        <Footer/>
    </>

}

export default Ins;