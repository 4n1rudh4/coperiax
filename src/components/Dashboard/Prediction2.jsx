import React,{useState,useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import {auth} from '../../firebase';
import {Link, useLocation } from "react-router-dom";

function Prediction(){

  const location1 = useLocation();
  const propsData = location1.state;
  console.log(propsData);
  const [state,setState]=useState(true);
  const [fert,setFert]=useState("");
  const [submitdisable,setSubmitdisable]=useState(false);

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
    const[error,setError]=useState("");
    const [soil,setSoil] = useState("");
    const [crop,setCrop] = useState("");
    function handle(){
      if ( !soil ){
        setError("Fill All Fields Please")
        return ;
    }
    
    setError("");
    setSubmitdisable(true)
    console.log(crop)
      fetch(`https://coperiax-server2-production.up.railway.app/predict?temperature=${propsData.temperature}&humidity=${propsData.humidity}&moisture=${propsData.moisture}&soil=${soil}&crop=${crop}&N=${propsData.N}&P=${propsData.P}&K=${propsData.K}`)
      .then((res) => res.json())
      .then((data) => {
        setFert(data.predictions);
        console.log(data.predictions)
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
        <div className="m-2 text-2xl font-bold">Fertilizer Predictor</div>
        
        <div className=" bg-green-200 w-11/12 rounded-2xl h-fit p-20 md:grid md:grid-cols-2 gap-4">
        
        <div>
        <div className="text-green-700 font-bold">Nitrogen Content : {propsData.N}</div>
        </div>
        <div>
        <div className="text-green-700 font-bold">Phosphorous Content : {propsData.P}</div>
        </div>
        <div>
        <div  className="text-green-700 font-bold">Potassium Content : {propsData.K}</div>
        </div>
        <div>
        <div  className="text-green-700 font-bold">Temperature : {propsData.temperature}</div>
        </div>
        <div>
        <div  className="text-green-700 font-bold">Humidity : {propsData.humidity}</div>
        </div>
        <div>
        
        </div>
        <button type="submit" onClick={()=> {handle();setCrop("OK");setSoil("OK")}} disabled={submitdisable} className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Predict</button>
       <a href="/ins"> <button type="submit" className=" hover:bg-green-400 md:block m-auto h-fit w-full first-letter: bg-green-600 p-2 mt-2 rounded-full">Instructions</button></a>
       <p className="flex font-medium flex-nowrap justify-center text-red-500">{error}</p></div></div> : <div className=" w-full bg-slate-50 md:flex md:justify-center text-green-700 text-2xl h-fit p-10">Fertilizer Suitable Recommended:
         <span className="font-bold text-3xl p-2 block ">{fert}</span><Link className="link" to="/dashboard" ><div className="hover:bg-green-400 md:block text-lg  text-black h-fit w-fit bg-green-600 md:pl-4 ml-4  p-2 rounded-full">Return To Dashboard</div></Link></div>}</div>
          <Footer/>
    </>
}

export default Prediction;