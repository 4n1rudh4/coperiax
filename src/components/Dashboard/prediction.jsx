import React,{useState,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';

function Prediction(){

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
      temperature : "",
      pH:"",
      rainfall : ""
  })
    function handle(){
        fetch("https://coperiax-server.onrender.com/predict-crop", {
            method: 'POST',
            body: JSON.stringify({
                N:values.N,P:values.P,K:values.K,temperature:values.temperature,humidity:values.humidity,pH:values.pH,rainfall:values.rainfall
              }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                setCrop(data.predictedCrop);
                setState(false)
             })
             .catch((err) => {
                console.log(err.message);
             });}
    
    return <>
    <Header date={date} name={username}/>
        <div className="flex justify-center w-full md:block md:w-10/12 md:m-auto">
        {state ? <div>
        <div className="m-2 text-2xl font-bold">Crop Predictor</div>
        <div className=" bg-green-200 w-11/12 rounded-2xl h-fit p-20 md:grid md:grid-cols-2 gap-4">
        
        <div>
        <div className="text-green-700 font-bold">Enter Nitrogen Content</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
              setValues((prev)=>(
                {...prev,N:event.target.value}
              ))
            }}>
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter Phosphorous Content</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,P:event.target.value}
            ))
          }} >
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter Potassium Content</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,K:event.target.value}
            ))
          }} >
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter Average Temperature</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,temperature:event.target.value}
            ))
          }} >
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter pH content of soil</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,pH:event.target.value}
            ))
          }} >
          </input>
        </div>
        <div>
        <div className="text-green-700 font-bold">Enter Average Rainfall</div>
          <input className="rounded-xl w-full p-1 m-2" onChange={(event)=>{
            setValues((prev)=>(
              {...prev,rainfall:event.target.value}
            ))
          }} >
          </input>
        </div>       
        <button type="submit" onClick={handle} className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Predict</button>
       <a href="/ins"> <button type="submit" className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Instructions</button></a>
        </div></div>: <div>crop is {crop}</div>} </div>
                  <Footer/>
    </>
}

export default Prediction;
