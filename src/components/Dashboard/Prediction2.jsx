import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../ui/Loader";

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

    const [username, setUser] = useState("");
    const [loading, setLoading] = useState(true);

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
            setLoading(true);
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
            } finally {
                setLoading(false);
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
        setLoading(true);
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
        } finally {
            setLoading(false);
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
        
        setLoading(true);
        fetch(
            `https://coperiax-server2.onrender.com/predict?temperature=${values2.temprature}&humidity=${values2.humidity}&moisture=${values2.rainfall}&soil=${soil}&crop=${crop}&N=${values.N}&P=${values.P}&K=${values.K}`
        )
            .then((res) => res.json())
            .then((data) => {
                setFert(data.predictions);

                setState(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="bg-[#dde7c7] font-poppins relative">
            <Header date={date} name={username} />
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 100 }}
                transition={{
                    duration: 0.8,
                    ease: [0.2, 1, 0.2, 1],
                    delay: 0.9,
                }}
                className="grid place-items-center h-full md:h-screen px-3 md:px-5 py-10"
            >
                {loading && <Loader />}
                {state ? (
                    <div>
                        <h1 className="m-2  text-2xl font-bold font-cabin">
                            Fertilizer Predictor
                        </h1>

                        <div className="grid place-items-center px-3 md:px-5 py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                                N: Math.round(
                                                    event.target.value
                                                ),
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
                                                P: Math.round(
                                                    event.target.value
                                                ),
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
                                                K: Math.round(
                                                    event.target.value
                                                ),
                                            }));
                                        }}
                                    ></input>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-5 mt-5">
                                <div className="">
                                    <label className="text-green-700 font-bold">
                                        Select Crop Type
                                        <select
                                            className="ip"
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
                                            className="ip"
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
                            <div className="mt-8">
                                <p className=" font-bold ">
                                    Enter your City/Town Eg. New Delhi
                                </p>
                                <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
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
                                        disabled={loading}
                                        className="btn"
                                    >
                                        Click Here to get Weather Details
                                    </button>
                                </div>
                                <div className="h-fit font-medium p-3 text-center mt-5 ">
                                    {weather ? (
                                        <div>
                                            Location : {weather.location.name},
                                            {weather.location.region},
                                            {weather.location.country}
                                            <br />
                                            Moisture :{" "}
                                            {weather.current.cloud * 2} mm ,
                                            Temperature :{" "}
                                            {weather.current.temp_c} C ,
                                            humidity :{" "}
                                            {weather.current.humidity}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="flex font-medium flex-nowrap justify-center text-red-500">
                                {error}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full mt-10">
                            <button
                                type="submit"
                                onClick={() => {
                                    handle();
                                    setCrop("OK");
                                    setSoil("OK");
                                }}
                                disabled={loading}
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
                        </div>
                    </div>
                ) : (
                    <div className="bg-brwn-0 font-bold shadow-lg rounded-xl h-fit p-10 md:w-6/12 w-fit block m-auto mt-2 mb-2 text-xl">
                        <div>Fertilizer Suitable for Following Conditions:</div>
                        <div className="mt-4">
                            <div>Nitrogen Content: {values.N}</div>
                            <div>Phosphorous Content: {values.P}</div>
                            <div>Potassium Content: {values.K}</div>
                            <div>
                                Location: {weather.location.name},{" "}
                                {weather.location.region},{" "}
                                {weather.location.country}
                            </div>
                            <div>Moisture: {weather.current.cloud} mm</div>
                            <div>Temperature: {weather.current.temp_c} C</div>
                            <div>Humidity: {weather.current.humidity}</div>
                        </div>
                        <div className="font-bold text-3xl p-2 mt-4">
                            {fert.toUpperCase()}
                        </div>
                        <Link to="/dashboard" className="btn mt-4">
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