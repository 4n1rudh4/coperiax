import React, { useEffect, useState } from "react";
import Header from "./components/header";

import Footer from "./components/footer";
import Hero from "./components/hero";
import { auth } from "./firebase";
import { motion } from "framer-motion";

function App() {
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
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    return (
        <motion.div className="font-poppins bg-[#dde7c7] ">
            <Header date={date} name={username} />
            <Hero />
            <Footer />
        </motion.div>
    );
}

export default App;
