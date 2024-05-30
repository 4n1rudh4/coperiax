import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
function Login() {
    const Navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",

        password: "",
    });
    const [state, setTrue] = useState(true);
    const [username, setUser] = useState("");
    const [error, setError] = useState("");
    const [submitdisable, setSubmitdisable] = useState(false);
    const [loading, setLoading] = useState(false);
    function handlesub() {
        if (!values.email || !values.password) {
            setError("Fill All Fields Please");
            return;
        }
        setError("");
        setLoading(true);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
            
                setSubmitdisable(false);
                Navigate("/dashboard");
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
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    return (
        <>
            <Header date={date} name={username} />
            {state ? (
                <div className="bg-[#dde7c7] h-screen grid place-items-center relative">
                    {loading && <Loader />}
                    <div className="card shadow-lg p-6 text-center font-poppins max-w-xl   rounded-lg">
                        <div className="card-body">
                            <h1 className="card-title text-2xl font-bold text-gray-800 mb-4">
                                Login to{" "}
                                <span className="font-cabin">AGROW</span>
                            </h1>
                            <input
                                className="ip"
                                type="text"
                                placeholder="Enter your Email"
                                onChange={(event) =>
                                    setValues((prev) => ({
                                        ...prev,
                                        email: event.target.value,
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
                                        password: event.target.value,
                                    }))
                                }
                            ></input>
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn mt-5"
                                onClick={handlesub}
                            >
                                Login
                            </button>
                            <p className="flex font-medium flex-nowrap justify-center text-red-500">
                                {error}
                            </p>
                            <div className="mt-5 card-actions flex flex-col">
                                <div>
                                    Not a User?{" "}
                                    <a
                                        href="/signup"
                                        className="text-green-800 font-bold"
                                    >
                                        Signup
                                    </a>
                                </div>
                                <div>
                                    Forgot Password?{" "}
                                    <a
                                        href="/forgot"
                                        className="text-green-800 font-bold"
                                    >
                                        Reset
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                Navigate("/dashboard")
            )}
            <Footer />
        </>
    );
}

export default Login;
