import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { auth } from "./firebase";
import { motion } from "framer-motion";

function JsonDataDisplay() {
    const [username, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName);
            } else {
                setUser("");
                console.log(user);
            }
        });
    });
    const [price, setPrice] = useState([]);
    const [offset, setOffset] = useState(0);
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    const API = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000019220782169bf4ab67fc27b9390fd8a8a&format=json&offset=${offset}`;

    const fetchArticles = async () => {
        try {
            // console.log(API);
            setLoading(true);
            const res = await fetch(API);
            const data = await res.json();
            setPrice(data.records);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Tog1 = () => {
        const newoffset1 = offset + 10;
        setOffset(newoffset1);
        fetchArticles();
    };
    const Tog2 = () => {
        if (offset > 0) {
            const newoffset2 = offset - 10;
            setOffset(newoffset2);
            fetchArticles();
        }
    };

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 500 }}
            exit={{ opacity: 0, y: 500 }}
            transition={{
                duration: 0.5,
                ease: [0.2, 1, 0.2, 1],
            }}
            className=" bg-[#dde7c7] font-poppins"
        >
            <Header date={date} name={username} />

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <span className="loading loading-infinity loading-lg scale-125"></span>
                </div>
            ) : (
                <div className="h-screen mt-5">
                    <p className="flex justify-center font-medium text-2xl p-4">
                        Prices of Daily Mandi Sale Prices - {date}
                    </p>

                    <div className="flex gap-3 justify-center p-2">
                        <button
                            className="btn text-black"
                            onClick={() => {
                                Tog2();
                            }}
                        >
                            Previous Page
                        </button>
                        <button
                            className="btn text-black"
                            onClick={() => {
                                Tog1();
                            }}
                        >
                            Next Page
                        </button>
                    </div>
                    <div className="px-10 mt-5">
                        <div className="overflow-x-auto p-5">
                            <table className="min-w-full divide-y divide-black rounded-xl outline outline-[1px] outline-black">
                                <thead className="bg-[#dde7c7]">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
                                        >
                                            State
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
                                        >
                                            Commodity
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
                                        >
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {price.map((props, index) => (
                                        <tr key={props.state + props.commodity}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {props.state}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {props.commodity}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    ₹&nbsp;
                                                    {(
                                                        props.modal_price / 50
                                                    ).toFixed(2)}{" "}
                                                    / KG
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </motion.div>
    );
}

export default JsonDataDisplay;
