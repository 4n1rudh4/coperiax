import React from "react";

function Footer(){
    return <div>
        <div  className="bg-green-500 w-full h-auto" style={{backgroundImage: "url('./resources/f.jpg')"}}>
        <div className="text-black text-xl text-center p-10">
        Established in 2023, Agrow: Transforming Agriculture with Advanced Website Solutions and Industry Insights.
        </div>
            <div className="flex w-full h-20 justify-evenly text-black text-lg">
                <div>© Copyright 2023 </div>
                <div>Made with love - Team Agrow</div>
            </div>
        </div>
    </div>
}

export default Footer;