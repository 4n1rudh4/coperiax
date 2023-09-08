import React,{useState,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';
import { Link } from "react-router-dom";

function Prediction(){
  const [submitdisable,setSubmitdisable]=useState(false);  
  const [error,setError]=useState("");

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
    const [crop,setCrop]=useState("");
    const [state,setState]=useState(true);
    const [values,setValues] = useState({
      N : "",
      P : "",
      K : "",
      pH:"",
      state:""
  })
  const [values2,setValues2] = useState({
    temprature : "",
    humidity:"",
    rainfall:""
})
  

  const [templocation,settempLocation]=useState({
    location:""
  });
  const [location,setLocation]=useState("new delhi");
  const [weather,setWeather]=useState(null);
  const API = `https://api.weatherapi.com/v1/forecast.json?key=13831d57eef84af4bc2130729230209&q=${location}`;

  const fetchArticles = async (url) => {
    console.log(location)
    
      try {
        const res = await fetch(API);
        const data = await res.json();
        setWeather(data);
        console.log(data)
        setValues2({rainfall:weather.current.cloud*2,temprature:weather.current.temp_c,humidity:weather.current.humidity})   
    } catch (e) {
        console.error(e)
    }   }

    function handle1(){
      setLocation(templocation.location);
      fetchArticles();
    }
    

    useEffect(() => {
      fetchArticles(API);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


    function handle(){
      if ( !values.N || !values.P || !values.K || !values.pH ){
        setError("Fill All Fields Please")
        return ;
    }
    if ( values.N>200 || values.P>200 || values.K>200 || values.pH>15 || values.N<1 || values.P<1 || values.K<1 || values.pH<1  ){
      setError("Please enter Reasonable values")
      return ;
  }
    
    setError("");
    setSubmitdisable(true)
      fetch(`https://coperiaxserver-production.up.railway.app/crop?N=${values.P}&P=${values.P}&K=${values.K}&pH=${values.pH}&temprature=${values2.temprature}&humidity=${values2.humidity}&avg_rainfall=${values2.rainfall}`)
      .then((res) => res.json())
      .then((data) => {
        setCrop(data.crop);
        setState(false)
        setSubmitdisable(false)
      })
      .catch((err) => {
         console.log(err.message);
      });
}
    
    return <>
    <Header date={date} name={username}/>
        <div className="flex justify-center w-full md:block md:w-10/12 md:m-auto p-2 ml-4">
        {state ? <div>
        <div className="m-2 text-2xl font-bold">Crop Predictor</div>
        
        <div className=" bg-green-200 w-11/12 rounded-2xl h-fit p-20 md:grid md:grid-cols-2 gap-4">
        
        <div>
        <div className="text-green-700 font-bold">Enter Nitrogen Content</div>
          <input type="number" className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
              setValues((prev)=>(
                {...prev,N:Math.round(event.target.value)}
              ))
            }}>
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter Phosphorous Content</div>
          <input type="number" className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,P:Math.round(event.target.value)}
            ))
          }} >
          </input>
        </div>
        <div>
        <div  className="text-green-700 font-bold">Enter Potassium Content</div>
          <input type="number" className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,K:Math.round(event.target.value)}
            ))
          }} >
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter your City/Town Eg. New Delhi</div>
          <input type="text" className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            settempLocation((prev)=>(
              {...prev,location:event.target.value}
            ))
          }} >
          
          </input>
          <button type="submit" onClick={handle1} className=" hover:bg-green-400 md:block m-auto h-fit w-fit bg-green-600 p-2 mt-2 rounded-full">Click Here to get Weather Details</button>
        </div>
       
        <div>
        <div type="number" className="text-green-700 font-bold">Enter pH content of soil</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,pH:Math.round(event.target.value)}
            ))
          }} >
          </input>
        </div>
        <div className="h-fit font-medium p-3">
          {weather ? <div>Location : {weather.location.name},{weather.location.region},{weather.location.country}<br/>
          Rainfall : {weather.current.cloud*2} mm , Temperature : {weather.current.temp_c} C , humidity : {weather.current.humidity}</div>:null}
        </div>
        <button type="submit" onClick={handle} disabled={submitdisable} className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Predict</button>
       <a href="/ins"> <button type="submit" className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Instructions</button></a>
       <p className="flex font-medium flex-nowrap justify-center text-red-500">{error}</p></div></div> : <div className=" w-full bg-slate-50 md:flex md:justify-center text-green-700 text-2xl h-fit p-10">Crop Suitable for Follwing conditions:
        <br/>  Nitrogen Content : {values.N} <br/> Phosphorous Content : {values.P}   <br/>Potassium Content : {values.K}  <br/> Location : {weather.location.name}, {weather.location.region},{weather.location.country}<br/>
          Rainfall : {weather.current.cloud*2} mm , Temperature : {weather.current.temp_c} C , humidity : {weather.current.humidity}  <br/> 
         <span className="font-bold text-3xl p-2 block ">{crop.toUpperCase()}</span><Link className="link" to="/prediction2" state={{'temperature':weather.current.temp_c,'humidity' : weather.current.humidity,'N':values.N,"P":values.P,"K":values.K,'moisture':weather.current.precip_mm,'crop':crop}}><div className="hover:bg-green-400 md:block text-lg  text-black h-fit w-fit bg-green-600 md:pl-4 ml-4  p-2 rounded-full">Predict Fertilizer</div></Link></div>}</div>
          <Footer/>
    </>
}

export default Prediction;