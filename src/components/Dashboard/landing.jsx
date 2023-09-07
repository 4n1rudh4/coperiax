import React,{useState,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth,db} from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

function Landing(){
    const[userdata,setUserdata]=useState({
        name:"",
        phone:"",
        email:"",
        area:"",
        city:"",
        crop:"",
        prod:""
    })
    const [id,setId]=useState("");
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const[state,setTrue]=useState(false);
    const[state2,setTrue2]=useState(false);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setTrue(true)
                setId(user.uid)
                setUser(user.displayName)
                
            } else{
                console.log("");
            }
        })
    })
    const [username,setUser]=useState("");
    const call = async()=>{
        const docSnap = await getDoc(doc(db,"userdetails",id));
        const big=docSnap.data();
        setUserdata({name:big.name,email:big.email,phone:big.phone,area:big.area,city:big.city,crop:big.crop,prod:big.prod})    
        setTrue2(true)
    }
    
    

    return <>
         <Header date={date} name={username}/>
        <div className="text-3xl flex md:justify-center w-full m-4 font-medium">Dashboard</div>
        <hr className="block pb-2 m-auto w-11/12 border-2 border-bg-black"/>
        
        {state ? <div className="block md:grid md:grid-cols-2 md:place-items-center pb-4">
        <button  onClick={call}>
            <div className="md:w-96 w-fit md:h-80 h-fit p-2 md:hover:bg-green-100 m-2 bg-slate-300 rounded-xl md:bg-hero-pattern">
                <div className="md:text-3xl text-lg font-bold m-2"> Your Info<br/> { state2 ?  <span className="text-lg   font-light"> <hr className="block pb-2 m-auto w-11/12 border-2 border-bg-black"/>Name: {userdata.name}<br/> E-mail: {userdata.email} <br/> Phone: {userdata.phone} <br/> Field Size - hectares: {userdata.area} <br/> City/Town: {userdata.city} <br/> Current Crop: {userdata.crop} <br/> Production/Year - tonnes: {userdata.prod}</span> : null }</div>
            </div></button>
            <a href="/ins">
            <div className="w-8/12 md:h-80 h-fit p-2 md:hover:bg-green-100 m-2 bg-slate-300 rounded-xl md:bg-prediction-pattern">
                <div className="md:text-3xl text-lg font-bold m-2">Get Suitable Crop Recommendation</div>

            </div></a>
        </div>: <div className="block w-fit p-2  bg-green-200 m-auto mt-10 mb-10 rounded"><div className="text-xl font-medium">You are not Logged in.<a href="/signup"> Click here to <button className="hover:bg-green-400 md:block m-auto h-fit w-fit first-letter: bg-green-600 p-2 mt-2 rounded-full">Signup or Login</button></a></div></div>}
        <Footer  />
    </>

}

export default Landing;