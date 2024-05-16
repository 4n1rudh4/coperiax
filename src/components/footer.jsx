import React from "react";

function Footer() {
    return (
        <footer className="footer p-10 w-full flex flex-row justify-between bg-white text-content">
            <aside>
                <p>
                    Established in 2023,{" "}
                    <span className="font-bold">Agrow</span>.
                    <br />
                    Transforming Agriculture with Advanced Website Solutions and
                    Industry Insights.
                </p>
            </aside>
            <div>
                <div>© Copyright 2023 </div>
                <div>Made with love - Team Agrow</div>
            </div>
        </footer>
    );
}

export default Footer;
