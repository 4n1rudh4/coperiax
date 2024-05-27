import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function Login() {
    const [submitdisable, setSubmitdisable] = useState(false);
    const [values, setValues] = useState({
        email: "",
    });
    const [filled, isFilled] = useState(true);
    const [error, setError] = useState("");

    function handlesub() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(values.email)) {
            setError("Invalid Email Address");
            return;
        }

        setError("");
        setSubmitdisable(true);
        sendPasswordResetEmail(auth, values.email).catch((err) => {
            console.log("Error-", err);
            setSubmitdisable(false);
            setError(err.message);
        });
        setError("");
        isFilled(false);
        setTimeout(() => {}, 60000);
    }

    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    return (
        <>
            <Header date={date} />
            <div className="bg-[#dde7c7] h-screen grid place-items-center font-poppins">
                {filled ? (
                    <div className="card shadow-lg p-6 text-center font-poppins max-w-xl   rounded-lg">
                        <h1 className="card-title text-2xl font-bold text-gray-800 mb-4">
                            Forgot Password
                        </h1>
                        <div className="card-body">
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
                            <button
                                disabled={submitdisable}
                                type="submit"
                                onClick={handlesub}
                                className="btn mt-3"
                            >
                                Send Reset Link
                            </button>
                            <p className="flex font-medium flex-nowrap justify-center text-red-500 my-5">
                                {error}
                            </p>
                            <div className="card-actions mt-5">
                                Not a User?
                                <a
                                    href="/signup"
                                    className="text-green-800 font-bold"
                                >
                                    Signup
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center p-10 text-lg">
                        <div className="bg-[#e7e1c7] shadow-lg rounded-xl h-fit p-10 md:w-6/12 w-fit block m-auto mt-2 mb-2 text-xl">
                            <p>
                                Link for you Reset Password has been sent in you
                                Email Address. Please check your Inbox.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Login;
