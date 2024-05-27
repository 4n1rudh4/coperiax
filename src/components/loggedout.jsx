import React from "react";
import Header from "./header";
import Footer from "./footer";

function Logout() {
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
            <div className="p-5 text-xl bg-[#dde7c7] rounded m-auto h-screen grid place-items-center">
                <div className="card shadow-lg p-6 text-center font-poppins  rounded-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl  font-bold text-gray-800 mb-4">
                            You are now Logged Out
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Click the button below to log in again.
                        </p>
                        <a href="/login" className="btn  font-bold">
                            Login Again
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Logout;
