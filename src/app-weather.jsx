import React,{useState,useEffect} from "react";
import Header from "./components/header";
import {auth} from './firebase';
import Footer from "./components/footer";

function WeatherApp() {
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
  const [weather,setWeather]=useState(null);
  const [location,setLocation]=useState("new delhi");
  const [query,setQuery]=useState("");

    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    
    const API = `https://api.weatherapi.com/v1/forecast.json?key=13831d57eef84af4bc2130729230209&q=${location}`;

    const fetchArticles = async (url) => {
      console.log(location)
      
        try {
          const res = await fetch(API);
          const data = await res.json();
          setWeather(data);
          console.log(data)
          
      } catch (e) {
          console.error(e)
      }
      
        
    }

  function handlechange(event){
    setQuery(event.target.value);
  }
  function handleclick(event){
    console.log(query)
    setLocation(query);
    event.preventDefault();
    fetchArticles();
   
  }

  useEffect(() => {
    fetchArticles(API);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

    return (
      
      <div>
      <Header date={date}  name={username} />
      <div className=" flex justify-center pb-5">
      <div className="m-3 text-xl font-bold">Enter Location For Weather Resutls</div>
        <form onSubmit={handleclick} className="md:flex block gap-2 pt-2">
                    <input className=" border-2 rounded border-bg-white h-10 w-52 text-black bg-white" value={query} onChange={handlechange} type="text" placeholder="Enter Location"></input>
                    <button type="submit" className=" hover:border-green-500 hover:border-2 hover:text-white text-black md:block h-fit w-fit first-letter: bg-green-600 p-2 rounded-full">Search</button></form></div> 

        {weather ? (
          <div className="block pb-10 md:grid md:place-items-center md:grid-cols-2 ">
          <div className="bg-slate-200 rounded h-fit md:h-48 md:w-11/12 w-4/5 block m-auto md:flex md:justify-center"><div className="font-bold">Current</div>
            <img src={weather.current.condition.icon} alt="w" className="h-20 w-20"/>
            <p className="text-xl flex">Location: {weather.location.name},{weather.location.country}<br/>
            Temperature : {weather.current.temp_c}, Condition : {weather.current.condition.text}<br/>
            Wind : {weather.current.wind_kph}, {weather.current.wind_dir} , Pressure : {weather.current.pressure_mb} Pa<br/>
            Humidity : {weather.current.humidity} , Precipitation : {weather.current.precip_mm} mm<br/>
            Clouds : {weather.current.cloud} % , Feels like : {weather.current.feelslike_c}
            </p>
            
            </div>
            <div className="bg-slate-200 rounded md:w-11/12 md:h-48 h-fit w-4/5 block m-auto md:flex md:justify-center"><div className="font-bold">Forecast</div>
            <img src={weather.forecast.forecastday[0].day.condition.icon} alt="w" className="h-20 w-20"/>
            <p className="text-xl flex">Location: {weather.location.name},{weather.location.country}<br/>
            Temperature : {weather.forecast.forecastday[0].day.avgtemp_c}, Condition : {weather.forecast.forecastday[0].day.condition.text}<br/>
            Wind : {weather.forecast.forecastday[0].day.maxwind_kph} <br/>
            Humidity : {weather.forecast.forecastday[0].day.avghumidity} , Precipitation : {weather.forecast.forecastday[0].day.totalprecip_mm} mm<br/>
           
            </p>
            
            </div>
          </div>
        ) : null}
        <Footer/>
      </div>
    );
  }
  
  export default WeatherApp;