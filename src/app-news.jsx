import React, { useEffect, useState } from "react";
import Header from "./components/header";
import { motion } from "framer-motion";
import Footer from "./components/footer";
import { auth } from "./firebase";
import NewsCard from "./components/ui/NewsCard";

const App = () => {
    const [username, setUser] = useState("");
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

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

    const API = `https://gnews.io/api/v4/search?q=agriculture&&lang=en&country=in&apikey=f03a5d4039233889a9c9c9a22bc90a88`;

    async function fetchArticles() {
        try {
            setLoading(true);
            const res = await fetch(API);
            const data = await res.json();
            setNews(data.articles);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles(API);
    }, []);

    return (
        <div className="font-poppins">
            <Header date={date} name={username} />
            <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 500 }}
                exit={{ opacity: 0, x: 500 }}
                transition={{
                    duration: 0.5,
                    ease: [0.2, 1, 0.2, 1],
                }}
                className="flex justify-center text-3xl font-cabin font-bold my-10"
            >
                Top Agriculture News
            </motion.div>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <span className="loading loading-infinity loading-lg scale-125"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-10">
                    {news.map((article, index) => (
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 500 }}
                            exit={{ opacity: 0, y: 500 }}
                            transition={{
                                duration: 1,
                                ease: [0.2, 1, 0.2, 1],
                                delay: 0.25 * index,
                            }}
                            key={index}
                        >
                            <NewsCard
                                key={article.title}
                                img={article.image}
                                title={article.title}
                                description={article.description}
                                link={article.url}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;
