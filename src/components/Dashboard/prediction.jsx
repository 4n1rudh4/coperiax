import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../ui/Loader";

function Prediction() {
    const [error, setError] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true);

    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    const [username, setUser] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.uid);
                setUser(user.displayName);
            } else {
                window.location.href = "/login";
            }
        });
    });
    const [crop, setCrop] = useState("");
    const [state, setState] = useState(true);
    const [values, setValues] = useState({
        N: "",
        P: "",
        K: "",
        pH: "",
    });
    const [values2, setValues2] = useState({
        temprature: "",
        humidity: "",
        rainfall: "",
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
                setLoading(true);
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
            // console.log(data);
            if (data.error) {
                setError("Please Enter Valid Location");
                setLoading(false);
                return;
            }
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
        if (!values.N || !values.P || !values.K || !values.pH) {
            setError("Fill All Fields Please");
            return;
        }
        if (
            values.N > 200 ||
            values.P > 200 ||
            values.K > 200 ||
            values.pH > 15 ||
            values.N < 1 ||
            values.P < 1 ||
            values.K < 1 ||
            values.pH < 1
        ) {
            setError("Please enter Reasonable values");
            return;
        }

        setError("");

        fetchCropData();
    }

    async function fetchCropData() {
        setLoading(true);
        try {
            const response = await fetch(
                `https://coperiaxserver.onrender.com/crop?N=${values.N}&P=${values.P}&K=${values.K}&pH=${values.pH}&temprature=${values2.temprature}&humidity=${values2.humidity}&avg_rainfall=${values2.rainfall}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setCrop(data.crop);
            setState(false);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#dde7c7] font-poppins relative">
            {loading && <Loader />}
            <Header date={date} name={username} />
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 100 }}
                transition={{
                    duration: 0.8,
                    ease: [0.2, 1, 0.2, 1],
                    delay: 0.9,
                }}
                className="grid place-items-center lg:h-screen w-full px-3 md:px-5 py-10"
            >
                {state ? (
                    <div>
                        <h1 className=" text-2xl font-bold font-cabin">
                            Crop Predictor
                        </h1>

                        <div className="my-5 grid md:grid-cols-2 gap-x-10 lg:gap-y-5 gap-y-10">
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
                            <div>
                                <div type="number" className=" font-bold">
                                    Enter pH content of soil
                                </div>
                                <input
                                    className="ip"
                                    onChange={(event) => {
                                        setValues((prev) => ({
                                            ...prev,
                                            pH: Math.round(event.target.value),
                                        }));
                                    }}
                                ></input>
                            </div>
                        </div>
                        <div className="">
                            <span className="font-bold">
                                Enter your City/Town Eg. New Delhi
                            </span>
                            <div className="flex md:flex-row flex-col items-center gap-5">
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
                                    className="btn my-5"
                                >
                                    Click Here to get Weather Details
                                </button>
                            </div>
                            <div className="h-fit font-medium  text-center   ">
                                {weather ? (
                                    <div className="p-3">
                                        Location : {weather.location.name},
                                        {weather.location.region},
                                        {weather.location.country}
                                        <br />
                                        Rainfall : {weather.current.cloud *
                                            2}{" "}
                                        mm , Temperature :{" "}
                                        {weather.current.temp_c} C , humidity :{" "}
                                        {weather.current.humidity}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex items-center md:flex-row  w-full justify-between flex-col">
                            <button
                                type="submit"
                                onClick={handle}
                                disabled={loading}
                                className="btn my-2  "
                            >
                                Predict
                            </button>
                            <a href="/ins" className="btn my-2 ">
                                Instructions
                            </a>
                        </div>
                        <p className="flex font-medium flex-nowrap justify-center text-red-500">
                            {error}
                        </p>
                    </div>
                ) : (
                    <div className="bg-[#e7e1c7] font-bold shadow-lg rounded-xl h-fit p-10 md:w-6/12 w-fit block m-auto mt-2 mb-2 text-xl">
                        <p>Crop Suitable for Following Conditions:</p>
                        <div className="mt-4">
                            <p>Nitrogen Content: {values.N}</p>
                            <p>Phosphorous Content: {values.P}</p>
                            <p>Potassium Content: {values.K}</p>
                            <p>
                                Location: {weather.location.name},{" "}
                                {weather.location.region},{" "}
                                {weather.location.country}
                            </p>
                            <p>Rainfall: {weather.current.cloud} mm</p>
                            <p>Temperature: {weather.current.temp_c} C</p>
                            <p>Humidity: {weather.current.humidity}</p>
                        </div>
                        <p className="font-bold text-3xl p-2 mt-4">
                            {crop.toUpperCase()}
                        </p>
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
