import React, { useState, useEffect } from "react";
import Header from "./components/header";
import { auth } from "./firebase";
import Footer from "./components/footer";

import WeatherCard from "./components/ui/WeatherCard";
import { motion } from "framer-motion";
function WeatherApp() {
    const [username, setUser] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName);
            } else {
                setUser("");
                
            }
        });
    });
    const [weather, setWeather] = useState(null);
    const [query, setQuery] = useState("New Delhi");
    const [loading, setLoading] = useState(false);
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    const API = `https://api.weatherapi.com/v1/forecast.json?key=13831d57eef84af4bc2130729230209&q=${query}`;

    async function fetchWeather() {
        if (query === "") {
            return alert("Please Enter A Location");
        }
        setLoading(true);

        try {
            const res = await fetch(API);
            const data = await res.json();
            setWeather(data);
           
        
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlechange(event) {
        setQuery(event.target.value);
    }
    function handleclick() {
        fetchWeather();
    }
    return (
        <div className=" bg-[#dde7c7]">
            <Header date={date} name={username} />
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 500 }}
                exit={{ opacity: 0, y: 500 }}
                transition={{
                    duration: 1,
                    ease: [0.2, 1, 0.2, 1],
                    delay: 0.25,
                }}
                className="lg:h-screen my-20 "
            >
                <div className="flex w-full justify-center items-center">
                    <div className="w-96 flex items-center justify-center gap-2">
                        <input
                            type="text"
                            className=" input bg-[#dde7c7] capitalize outline outline-1 outline-black focus:outline-none"
                            placeholder="Start With Your Location"
                            value={query}
                            onChange={handlechange}
                        />
                        <button className="btn  " onClick={handleclick}>
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </div>
                </div>
                <div className="px-20 mt-10">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <span className="loading loading-infinity loading-lg"></span>
                        </div>
                    ) : (
                        weather !== null && (
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 500 }}
                                exit={{ opacity: 0, y: 500 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.2, 1, 0.2, 1],
                                    delay: 0.3,
                                }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                            >
                                <WeatherCard
                                    src={weather.current.condition.icon}
                                    title={
                                        "Currently At " + weather.location.name
                                    }
                                    temperature={weather.current.temp_c}
                                    feelsLike={weather.current.condition.text}
                                    humidity={weather.current.humidity}
                                    wind={weather.current.wind_kph}
                                    precipitation={weather.current.precip_mm}
                                    clouds={weather.current.cloud}
                                />
                                <WeatherCard
                                    src={
                                        weather.forecast.forecastday[0].day
                                            .condition.icon
                                    }
                                    title={
                                        "Forecast For " +
                                        weather.forecast.forecastday[0].date
                                    }
                                    temperature={
                                        weather.forecast.forecastday[0].day
                                            .avgtemp_c
                                    }
                                    feelsLike={
                                        weather.forecast.forecastday[0].day
                                            .condition.text
                                    }
                                    humidity={
                                        weather.forecast.forecastday[0].day
                                            .avghumidity
                                    }
                                    wind={""}
                                    precipitation={
                                        weather.forecast.forecastday[0].day
                                            .totalprecip_mm
                                    }
                                />
                            </motion.div>
                        )
                    )}
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}

export default WeatherApp;
