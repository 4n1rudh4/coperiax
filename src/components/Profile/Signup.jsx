import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../ui/Loader";

function Signup() {
    const [state, setTrue] = useState(true);
    const [username, setUser] = useState("");
    const [state2, setTrue2] = useState(true);
    const [state3, setState3] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setTrue(false);
                setUser(user.displayName);
            } else {
                setUser("");
            }
        });
    });

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        area: "",
        city: "",
        crop: "",
        prod: "",
    });

    const [error, setError] = useState("");
    const [submitdisable, setSubmitdisable] = useState(false);
    function handleNext() {
        const phonePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        const { phone, name, email, password } = values;

        if (!phone || !name || !email || !password) {
            setError("Fill All Fields Please");
            return;
        }

        if (!phonePattern.test(phone)) {
            setError("Invalid Phone Number");
            return;
        }

        if (!emailPattern.test(email)) {
            setError("Invalid Email Address");
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(
                "Password must be at least 8 characters long, and include at least one letter and one number. Should not contain special charecters. "
            );
            return;
        }

        setError("");
        setTrue2(false);
    }

    async function handlesub() {
        if (!values.area || !values.city || !values.crop || !values.prod) {
            setError("Fill All Fields Please");
            return;
        }
        setError("");
        setLoading(true);
        setSubmitdisable(true);
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
                sendEmailVerification(user);
                navigate("/login");
                setSubmitdisable(false);

                await setDoc(doc(db, "userdetails", user.uid), {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    area: values.area,
                    city: values.city,
                    crop: values.crop,
                    prod: values.prod,
                });
                setState3(false);
            })
            .catch((err) => {
                console.log("Error-", err);
                setSubmitdisable(false);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    return (
        <div className="relative">
            <Header date={date} name={username} />
            {loading && <Loader />}
            <div className="bg-[#dde7c7] h-screen grid place-items-center font-poppins ">
                {state3 ? (
                    <div className="md:w-[35rem] w-auto">
                        {state2 ? (
                            <div>
                                {state ? (
                                    <div className="">
                                        <div className="card shadow-lg p-6 text-center font-poppins rounded-lg">
                                            <div className="card-body">
                                                <h1 className="card-title text-2xl font-bold text-gray-800 mb-4">
                                                    Signup to AGROW
                                                </h1>
                                                <input
                                                    className="ip"
                                                    type="text"
                                                    placeholder="Enter your Name"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            name: event.target
                                                                .value,
                                                        }))
                                                    }
                                                ></input>
                                                <input
                                                    className="ip"
                                                    type="text"
                                                    placeholder="Enter your Email"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            email: event.target
                                                                .value,
                                                        }))
                                                    }
                                                ></input>
                                                <input
                                                    className="ip"
                                                    type="text"
                                                    placeholder="Enter your Phone Number"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            phone: event.target
                                                                .value,
                                                        }))
                                                    }
                                                ></input>
                                                <input
                                                    className="ip"
                                                    type="password"
                                                    placeholder="Enter your Password"
                                                    onChange={(event) =>
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            password:
                                                                event.target
                                                                    .value,
                                                        }))
                                                    }
                                                ></input>
                                                <button
                                                    type="submit"
                                                    disabled={submitdisable}
                                                    className="btn mt-5"
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </button>
                                                <p className="flex font-medium flex-nowrap justify-center text-red-500">
                                                    {error}
                                                </p>
                                                <div className="mt-5 card-actions">
                                                    Already A User?{" "}
                                                    <a
                                                        href="/login"
                                                        className="text-green-800 font-bold "
                                                    >
                                                        Login
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card p-6 text-center max-w-xl   rounded-lg">
                                        <h1 className="card-title text-lg">
                                            You Are Already Logged in
                                        </h1>

                                        <div className="flex flex-row gap-5 my-5">
                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                <a href="/">Return to Home</a>
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn"
                                            >
                                                <a href="/dashboard">
                                                    Go to Dashboard
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                )}{" "}
                            </div>
                        ) : (
                            <div className="card shadow-lg p-6 text-center font-poppins   rounded-lg">
                                <h1 className="card-title text-2xl font-bold pb-4">
                                    Signup to AGROW
                                </h1>
                                <div className="card-body">
                                    <input
                                        className="ip"
                                        type="text"
                                        placeholder="Enter your Field Size in Hectares"
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                area: event.target.value,
                                            }))
                                        }
                                    ></input>
                                    <input
                                        className="ip"
                                        type="text"
                                        placeholder="Enter your City/Town"
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                city: event.target.value,
                                            }))
                                        }
                                    ></input>
                                    <input
                                        className="ip"
                                        type="text"
                                        placeholder="Enter your Current Crop"
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                crop: event.target.value,
                                            }))
                                        }
                                    ></input>
                                    <input
                                        className="ip"
                                        type="number"
                                        placeholder="Enter your Yearly Production Capacity(tonnes)"
                                        onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                prod: event.target.value,
                                            }))
                                        }
                                    ></input>
                                    <div className="card-actions mt-5 w-full flex justify-between">
                                        <button
                                            type="submit"
                                            disabled={submitdisable}
                                            className="btn"
                                            onClick={() => {
                                                setTrue2(true);
                                            }}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn"
                                            onClick={() => {
                                                handlesub();
                                            }}
                                        >
                                            Signup
                                        </button>
                                    </div>
                                    <p className="flex font-medium flex-nowrap justify-center text-red-500">
                                        {error}
                                    </p>
                                    <div className="mt-5">
                                        Already A User?{" "}
                                        <a
                                            href="/login"
                                            className="text-green-800 font-bold "
                                        >
                                            Login
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}{" "}
                    </div>
                ) : (
                    <div className="bg-[#e7e1c7] font-bold shadow-lg rounded-xl h-fit p-10 md:w-6/12 w-fit  block m-auto mt-2 mb-2 text-xl">
                        Signed up Succesfully{" "}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Signup;