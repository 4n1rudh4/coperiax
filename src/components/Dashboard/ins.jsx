import React,{useEffect,useState} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';
import { Link  } from "react-router-dom";

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
        <hr className="block pb-2 m-auto w-11/12 border-2 border-bg-black"/>
        <div className="text-xl p-2">
            <ul>
                <li>
                    To Get the predictions for a suitable crop for your field conditions you will have to first procure a NPK testing kit which can measure the <span className=" font-bold text-green-700">Nitrogen, Potassium , Phosphoruos contents in your field.</span> which will be used to accurately determine the crop and fertilizer
                </li>
            </ul>
        </div>
        <img className="block m-auto rounded h-1/4 w-1/4" alt="npk" src="./resources/npk.png"/>
       <a className="flex justify-center w-full text-green-700 underline" href="https://www.indiamart.com/proddetail/soil-testing-kit-npk-ph-11190569148.html">Click here to Procure.</a> 
       <a className="flex justify-center w-full text-green-700 underline" href="https://getbusygardening.com/garden-soil-testing/#:~:text=You%27ll%20only%20be%20using,to%20make%20it%20super%20easy.">Instructions to use the NPK test kit.</a> 
       <Link className="link flex justify-center" to="/prediction"> <button type="submit" className=" hover:bg-green-400 md:block m-auto h-fit w-fit text-xl font-bold bg-green-600 p-2 mt-2 mb-2 rounded-full" >PROCEED</button></Link>
        </div>
        <Footer  />
    </>

}

export default Ins;