import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Prediction() {
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    const [state, setState] = useState(true);
    const [id, setId] = useState("");
    const [fert, setFert] = useState("");
    const [submitdisable, setSubmitdisable] = useState(false);
    const [username, setUser] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.uid);
                setUser(user.displayName);
            } else {
                setUser("");
            }
        });
    });
    const [error, setError] = useState("");
    const [soil, setSoil] = useState("Sandy");
    const [crop, setCrop] = useState("Maize");

    const [values, setValues] = useState({
        N: "",
        P: "",
        K: "",
    });
    const [values2, setValues2] = useState({
        temprature: "",
        humidity: "",
        moisture: "",
    });

    const [templocation, settempLocation] = useState({
        location: "",
    });
    const [templocation2, settempLocation2] = useState({
        location: "",
    });
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        const fetchArticles1 = async () => {
            try {
                const docSnap = await getDoc(doc(db, "userdetails", id));

                const big = docSnap.data();
                settempLocation({ location: big.city });
                settempLocation2({ location: big.city });
                const res = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=13831d57eef84af4bc2130729230209&q=${big.city}`
                );
                const data = await res.json();
                setWeather(data);

                setValues2({
                    rainfall: data.current.cloud,
                    temprature: data.current.temp_c,
                    humidity: data.current.humidity,
                });
            } catch (e) {
                console.log(e);
            }
        };
        fetchArticles1();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, templocation.location]);

    const fetchArticles = async () => {
        if (templocation2.location === "") {
            setError("Please Enter Location");
            return;
        }
        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=13831d57eef84af4bc2130729230209&q=${templocation2.location}`
            );
            const data = await res.json();
            setWeather(data);

            setValues2({
                rainfall: weather.current.cloud,
                temprature: weather.current.temp_c,
                humidity: weather.current.humidity,
            });
        } catch (e) {
            console.error(e);
        }
    };

    function handle1() {
        fetchArticles();
    }

    function handle() {
        if (!values.N || !values.P || !values.K || !soil || !crop) {
            setError("Fill All Fields Please");
            return;
        }
        if (
            values.N > 200 ||
            values.P > 200 ||
            values.K > 200 ||
            values.N < 1 ||
            values.P < 1 ||
            values.K < 1
        ) {
            setError("Please enter Reasonable values");
            return;
        }
        setError("");
        setSubmitdisable(true);

        fetch(
            `https://coperiax-server2.onrender.com/predict?temperature=${values2.temprature}&humidity=${values2.humidity}&moisture=${values2.rainfall}&soil=${soil}&crop=${crop}&N=${values.N}&P=${values.P}&K=${values.K}`
        )
            .then((res) => res.json())
            .then((data) => {
                setFert(data.predictions);

                setState(false);
                setSubmitdisable(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="bg-[#dde7c7]">
            <Header date={date} name={username} />
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 100 }}
                transition={{
                    duration: 0.8,
                    ease: [0.2, 1, 0.2, 1],
                    delay: 0.9,
                }}
                className="flex justify-center w-full md:block md:w-10/12 md:m-auto p-2 ml-4"
            >
                {state ? (
                    <div>
                        <h1 className="m-2  text-2xl font-bold font-cabin">
                            Fertilizer Predictor
                        </h1>

                        <div className="w-11/12 rounded-2xl h-fit p-5 lg:p-20 grid md:grid-cols-2 gap-x-10 lg:gap-y-5 gap-y-10 font-poppins  ">
                            <div>
                                <div className=" font-bold">
                                    Enter Nitrogen Content
                                </div>
                                <input
                                    type="number"
                                    className="ip"
                                    onChange={(event) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            N: Math.round(event.target.value),
                                        }));
                                    }}
                                ></input>
                            </div>
                            <div>
                                <div className=" font-bold">
                                    Enter Phosphorous Content
                                </div>
                                <input
                                    type="number"
                                    className="ip"
                                    onChange={(event) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            P: Math.round(event.target.value),
                                        }));
                                    }}
                                ></input>
                            </div>
                            <div>
                                <div className=" font-bold">
                                    Enter Potassium Content
                                </div>
                                <input
                                    type="number"
                                    className="ip"
                                    onChange={(event) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            K: Math.round(event.target.value),
                                        }));
                                    }}
                                ></input>
                            </div>
                            <div className="block content-end">
                                <div className="p-6">
                                    <label className="text-green-700 font-bold">
                                        Select Crop Type
                                        <select
                                            className="ml-2"
                                            value={crop}
                                            onChange={(event) =>
                                                setCrop(event.target.value)
                                            }
                                        >
                                            <option value="Maize">Maize</option>
                                            <option value="Sugarcane">
                                                Sugarcane
                                            </option>
                                            <option value="Cotton">
                                                Cotton
                                            </option>
                                            <option value="Tobacco">
                                                Tobacco
                                            </option>
                                            <option value="Paddy">Paddy</option>
                                            <option value="Barley">
                                                Barley
                                            </option>
                                            <option value="Wheat">Wheat</option>
                                            <option value="Millets">
                                                Millets
                                            </option>
                                            <option value="Oil seeds">
                                                Oil seeds
                                            </option>
                                            <option value="Pulses">
                                                Pulses
                                            </option>
                                            <option value="Ground Nuts">
                                                Ground Nuts
                                            </option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label className="text-green-700 font-bold ml-6">
                                        Select Soil Type
                                        <select
                                            className="ml-4"
                                            value={soil}
                                            onChange={(event) =>
                                                setSoil(event.target.value)
                                            }
                                        >
                                            <option value="Sandy">Sandy</option>
                                            <option value="Loamy">Loamy</option>
                                            <option value="Black">Black</option>
                                            <option value="Red">Red</option>
                                            <option value="Clayey">
                                                Clayey
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full ">
                            <div className="w-96  mx-auto">
                                <div className=" font-bold ">
                                    Enter your City/Town Eg. New Delhi
                                </div>
                                <input
                                    type="text"
                                    className="ip"
                                    value={templocation2.location}
                                    onChange={(event) => {
                                        settempLocation2((prev) => ({
                                            ...prev,
                                            location: event.target.value,
                                        }));
                                    }}
                                ></input>
                                <button
                                    type="submit"
                                    onClick={handle1}
                                    className="btn my-5 w-full"
                                >
                                    Click Here to get Weather Details
                                </button>
                            </div>
                            <div className="h-fit font-medium p-3 text-center   ">
                                {weather ? (
                                    <div>
                                        Location : {weather.location.name},
                                        {weather.location.region},
                                        {weather.location.country}
                                        <br />
                                        Moisture : {weather.current.cloud *
                                            2}{" "}
                                        mm , Temperature :{" "}
                                        {weather.current.temp_c} C , humidity :{" "}
                                        {weather.current.humidity}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="md:w-fit  md:mx-auto md:block md:justify-center ml-6 ">
                            <button
                                type="submit"
                                onClick={() => {
                                    handle();
                                    setCrop("OK");
                                    setSoil("OK");
                                }}
                                disabled={submitdisable}
                                className="btn w-96 my-2  "
                            >
                                Predict
                            </button>
                            <a href="/ins">
                                {" "}
                                <button type="submit" className="btn w-96  ">
                                    Instructions
                                </button>
                            </a>
                            <p className="flex font-medium flex-nowrap justify-center text-red-500">
                                {error}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className=" w-full bg-slate-50 md:flex md:justify-center  text-2xl h-fit p-10">
                        Fertilizer Suitable for Follwing conditions:
                        <br /> Nitrogen Content : {values.N} <br /> Phosphorous
                        Content : {values.P} <br />
                        Potassium Content : {values.K} <br /> Location :{" "}
                        {weather.location.name}, {weather.location.region},
                        {weather.location.country}
                        <br />
                        Moisture : {weather.current.cloud} mm , Temperature :{" "}
                        {weather.current.temp_c} C , humidity :{" "}
                        {weather.current.humidity} <br />
                        <span className="font-bold text-3xl p-2 block ">
                            {fert.toUpperCase()}
                        </span>
                        <Link to="/dashboard" className="btn ">
                            Dashboard
                        </Link>
                    </div>
                )}
            </motion.div>
            <Footer />
        </div>
    );
}

export default Prediction;
