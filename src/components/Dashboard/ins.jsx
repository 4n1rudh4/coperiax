import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Ins() {
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
                setUser(user.displayName);
            } else {
                setUser("");
            }
        });
    });

    return (
        <div className="bg-[#dde7c7]">
            <Header name={username} date={date} />

            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 100 }}
                transition={{
                    duration: 0.8,
                    ease: [0.2, 1, 0.2, 1],
                    delay: 0.9,
                }}
                className="rounded-lg lg:h-screen  my-10 lg:p-20 p-5 "
            >
                <h1 className=" text-3xl mb-10 font-bold font-cabin text-center">
                    Instructions
                </h1>
                <div className="flex lg:flex-row flex-col w-full justify-between items-center gap-10">
                    <img
                        className="block m-auto rounded h-96"
                        alt="npk"
                        src="./resources/npk.png"
                    />

                    <div>
                        <div className="text-xl p-2 font-poppins">
                            <ul>
                                <li>
                                    To Get the predictions for a suitable crop
                                    for your field conditions you will have to
                                    first procure a NPK testing kit which can
                                    measure the{" "}
                                    <span className=" font-bold text-green-700">
                                        Nitrogen, Potassium , Phosphoruos
                                        contents in your field.
                                    </span>{" "}
                                    which will be used to accurately determine
                                    the crop and fertilizer
                                </li>
                            </ul>
                        </div>

                        <div className="flex lg:flex-row flex-col gap-5 mt-10 justify-between">
                            <div className="flex gap-5">
                                <a
                                    className="btn"
                                    href="https://www.indiamart.com/proddetail/soil-testing-kit-npk-ph-11190569148.html"
                                >
                                    Click here to Procure.
                                </a>
                                <a
                                    className="btn"
                                    href="https://getbusygardening.com/garden-soil-testing/#:~:text=You%27ll%20only%20be%20using,to%20make%20it%20super%20easy."
                                >
                                    Instructions to use the NPK test kit.
                                </a>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Link className="btn" to="/prediction">
                                {" "}
                                Proceed
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}

export default Ins;