import Card from "./ui/Card";
import cardsDetails from "../resources/carddata";
function Hero() {
    return (
        <main className="px-20 py-10">
            <div className=" flex items-center justify-center" id="hero">
                <div
                    className="hero h-[35rem] w-[90%] rounded-xl"
                    style={{
                        backgroundImage:
                            "url(https://ezfloinjection.com/wp-content/uploads/what-is-precision-agriculture-2.jpg)",
                    }}
                >
                    <div className="hero-overlay bg-black bg-opacity-0"></div>
                    {/* <div className="hero-content text-center  flex items-start justify-start flex-col w-full">
                        <div className=" text-white text-left bg-[#232c06] bg-opacity-40 p-5 rounded-md backdrop-blur-md ">
                            <h1 className="mb-5 text-4xl font-bold">
                                Agrow FieldTech
                            </h1>
                            <p className="mb-5 w-[35rem] text-base">
                                Agrow is a comprehensive online platform
                                meticulously designed to empower farmers in
                                their agricultural pursuits. Leveraging
                                cutting-edge technology, it offers an array of
                                indispensable tools and resources to aid farmers
                                in optimizing their crop cultivation and
                                financial management.
                            </p>
                            <button className="btn btn-primary bg-[#f7bf84] border-0 hover:bg-[#232c06] text-white">
                                Explore
                                <span class="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
            <h3 className="text-3xl font-bold mt-20">
                Some of the Services we provide
            </h3>
            <div className="grid grid-cols-2 mt-10  gap-5">
                {cardsDetails.map((card) => (
                    <Card
                        src={card.src}
                        title={card.title}
                        details={card.details}
                    />
                ))}
            </div>
        </main>
    );
}

export default Hero;
