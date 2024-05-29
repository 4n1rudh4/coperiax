import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
function Landing() {
    const [userdata, setUserdata] = useState({
        name: "",
        phone: "",
        email: "",
        area: "",
        city: "",
        crop: "",
        prod: "",
    });
    const [id, setId] = useState("");
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    const [state, setTrue] = useState(false);
    const [state2, setTrue2] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setTrue(true);
                setId(user.uid);
                setUser(user.displayName);
            } else {
                console.log("");
            }
        });
    });
    const [username, setUser] = useState("");
    useEffect(() => {
    const call = async () => {
        setLoading(true);
        try {
            const docSnap = await getDoc(doc(db, "userdetails", id));
            console.log(docSnap.data());
            const big = docSnap.data();
            setUserdata({
                name: big.name,
                email: big.email,
                phone: big.phone,
                area: big.area,
                city: big.city,
                crop: big.crop,
                prod: big.prod,
            });
            setTrue2(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    call();
    },[id]
);
    
  
   

    return (
        <>
            <Header date={date} name={username} />
            <div className="md:h-screen h-full  bg-[#dde7c7] grid place-items-center">
                {state ? (
                    <div className="text-3xl flex justify-center font-cabin font-medium">
                        Welcome to the dashboard,
                        <span className="capitalize">&nbsp;{username}</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-5">
                        <h1 className="text-3xl">
                            Please Login to view the Dashboard
                        </h1>
                        <Link to={"/login"} className="btn">
                            Login
                        </Link>
                    </div>
                )}

                {state && (
                    <div className="block md:grid md:grid-cols-2 md:place-items-center pb-4 mb-48">
                        <div
                            className="w-96 h-96 p-5 hover:bg-[#dde7c7] duration-200 m-2 bg-brwn-0 outline-2 outline-black outline rounded-xl cursor-pointer active:scale-95"
                            //onClick={call} 
                        >
                            <div className=" text-3xl m-2">
                                <div className="flex flex-col items-center justify-center w-full gap-5">
                                    <div className="btn scale-150">
                                        <span class="material-symbols-outlined scale-150">
                                            face
                                        </span>
                                    </div>
                                    <h2 className="font-cabin">Your Info</h2>
                                </div>
                                {loading ? (
                                    <>
                                        <span className="loading loading-infinity loading-lg"></span>
                                    </>
                                ) : (
                                    state2 && (
                                        <div className="text-lg font-poppins font-light ">
                                            <p className="capitalize">
                                                Name:&nbsp;{userdata.name}
                                            </p>
                                            <p>Email:&nbsp;{userdata.email} </p>
                                            <p>Phone:&nbsp;{userdata.phone}</p>
                                            <p>
                                                Field Size - hectares:&nbsp;
                                                {userdata.area}
                                            </p>
                                            <p>
                                                City/Town:&nbsp;
                                                {userdata.city}
                                            </p>
                                            <p>
                                                Current Crop:&nbsp;
                                                {userdata.crop}
                                            </p>
                                            <p>
                                                Production/Year - tonnes:&nbsp;
                                                {userdata.prod}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                       <div >
                        <a href="/ins">
                            <div className="p-5 h-48 hover:bg-[#dde7c7] duration-200 m-2 bg-brwn-0 outline-2 outline-black outline rounded-xl cursor-pointer active:scale-95 w-96">
                                <div className="flex flex-col items-center justify-center w-full gap-5">
                                    <div className="btn scale-150">
                                        <span class="material-symbols-outlined scale-150">
                                            psychiatry
                                        </span>
                                    </div>

                                    <h2 className="font-cabin md:text-3xl text-lg  m-2 text-center">
                                        Get Crop Recommendation
                                    </h2>
                                </div>
                            </div>
                        </a>
                        <a href="/ins2">
                        <div className="p-5 h-48 hover:bg-[#dde7c7] duration-200 m-2 bg-brwn-0 outline-2 outline-black outline rounded-xl cursor-pointer active:scale-95 w-96">
                                <div className="flex flex-col items-center justify-center w-full gap-5">
                                    <div className="btn scale-150">
                                        <span class="material-symbols-outlined scale-150">
                                            psychiatry
                                        </span>
                                    </div>

                                    <h2 className="font-cabin md:text-3xl text-lg  m-2 text-center">
                                        Get Feritilizer Recommendation
                                    </h2>
                                </div>
                            </div></a></div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}

export default Landing;
