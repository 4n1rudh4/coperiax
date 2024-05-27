// import Cards from "../components/cards";
import Data from "../resources/carddata";

function ImgOverlayExample() {
    return (
        <div className="m-auto block mt-10">
            {/* <div id="carousel">
                <div className="carousel  h-[40rem]">
                <div id="item1" className="carousel-item w-full ">
                    <div className="overflow-hidden w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/11499392/pexels-photo-11499392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div id="item2" className="carousel-item w-full ">
                    <div className="overflow-hidden w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/3693280/pexels-photo-3693280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                </div>
                <div id="item3" className="carousel-item w-full ">
                    <div className="overflow-hidden w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/4272232/pexels-photo-4272232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                </div>
                <div id="item4" className="carousel-item w-full ">
                    <div className="overflow-hidden w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/3074526/pexels-photo-3074526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">
                    1
                </a>
                <a href="#item2" className="btn btn-xs">
                    2
                </a>
                <a href="#item3" className="btn btn-xs">
                    3
                </a>
                <a href="#item4" className="btn btn-xs">
                    4
                </a>
            </div>
            </div> */}

            <div className="block text-center pt-2">
                <button className="md:hidden  m-auto h-fit w-fit first-letter: bg-green-600 p-3 hover:bg-green-200 font-bold text-black text-2xl mt-2 rounded-full">
                    <a href="/login">Click here to get Started</a>
                </button>
                <p className="md:hidden font-medium  text-lg">
                    Agrow is a comprehensive online platform meticulously
                    designed to empower farmers in their agricultural pursuits.
                    Leveraging cutting-edge technology, it offers an array of
                    indispensable tools and resources to aid farmers in
                    optimizing their crop cultivation and financial management.
                </p>

                <p className="font-bold text-xl  p-2">Sailient Features</p>
            </div>
            <hr className="block pb-2 m-auto w-11/12 border-2 border-bg-black" />
            <div className="md:grid md:grid-cols-2">
                {/* {Data.map((props) => (
                    <Cards key={props.id} src={props.src} name={props.name} />
                ))} */}
            </div>
        </div>
    );
}

export default ImgOverlayExample;
