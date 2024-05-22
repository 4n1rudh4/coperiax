import React from "react";

function Footer() {
    return (
        <footer className="footer p-10 w-full flex lg:flex-row flex-col justify-between bg-brwn-0 text-content font-cabin">
            <aside>
                <p className="text-base">
                    Established in 2023,{" "}
                    <span className="font-bold">Agrow</span>.
                    <br />
                    Transforming Agriculture with Advanced Website Solutions and
                    Industry Insights.
                </p>
            </aside>
            <div className="text-base">
                <p>© Copyright 2023 </p>
                <p>Made with love - Team Agrow</p>
            </div>
        </footer>
    );
}

export default Footer;
