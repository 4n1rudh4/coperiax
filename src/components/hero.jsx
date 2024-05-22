import Card from "./ui/Card";
import cardsDetails from "../resources/carddata";
import { motion } from "framer-motion";
function Hero() {
    return (
        <motion.main
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 500 }}
            exit={{ opacity: 0, y: 500 }}
            transition={{
                duration: 1,
                ease: [0.2, 1, 0.2, 1],
                delay: 0.25,
            }}
            className="lg:px-20 py-10 "
        >
            <div className="flex items-center justify-center" id="hero">
                <div
                    className="hero h-[35rem] w-[90%] rounded-xl"
                    style={{
                        backgroundImage:
                            "url(https://ezfloinjection.com/wp-content/uploads/what-is-precision-agriculture-2.jpg)",
                    }}
                >
                    <div className="hero-content text-center  flex items-start justify-end h-full flex-col w-full">
                        <div className=" text-white text-left bg-opacity-40 p-5 rounded-md  ">
                            <motion.h1
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 100 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.2, 1, 0.2, 1],
                                    delay: 0.5,
                                }}
                                className="mb-5 text-3xl lg:text-4xl font-bold font-cabin"
                            >
                                Agrow FieldTech
                            </motion.h1>
                            <motion.p
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 100 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.2, 1, 0.2, 1],
                                    delay: 0.9,
                                }}
                                className="mb-5 w-auto  lg:w-[35rem] text-sm lg:text-base"
                            >
                                Agrow is a comprehensive online platform
                                meticulously designed to empower farmers in
                                their agricultural pursuits. Leveraging
                                cutting-edge technology, it offers an array of
                                indispensable tools and resources to aid farmers
                                in optimizing their crop cultivation and
                                financial management.
                            </motion.p>
                            {/* <motion.button
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 100 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.2, 1, 0.2, 1],
                                    delay: 1.2,
                                }}
                                className="btn btn-primary bg-[#f7bf84] border-0 hover:bg-[#232c06] text-white"
                            >
                                Explore
                                <span class="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </motion.button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5">
                <h3 className="text-3xl font-bold mt-20 font-cabin">
                    Some of the Services we provide
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10  gap-5">
                    {cardsDetails.map((card) => (
                        <Card
                            src={card.src}
                            title={card.title}
                            details={card.details}
                        />
                    ))}
                </div>
            </div>
        </motion.main>
    );
}

export default Hero;
