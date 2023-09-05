import React from "react";
import Header from "./header";
import Footer from "./footer";

function Logout(){
    var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
return <>
    <Header date={date}/>
    <div className="block h-fit w-fit p-5 bg-green-200 rounded m-auto">
        <div>
            You are now Logged Out.
            <br/>
            Click here to <a className="text-green-700" href="/login">Login Again.</a>
        </div>
    </div>
    <Footer/>
</>
}

export default Logout;