import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Header(props) {
    function logout() {
        navigate("/loggedout");
        return signOut(auth);
    }
    var today = new Date();
    const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    const navigate = useNavigate();
    return (
        <>
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -500 }}
                exit={{ opacity: 0, y: -500 }}
                transition={{
                    duration: 1,
                    ease: [0.2, 1, 0.2, 1],
                }}
                className="navbar px-10 lg:px-32 py-2 font-cabin sticky top-0 z-[100] bg-[#E7E1C7]  text-base"
            >
                <div className="flex-1">
                    <Link
                        to={"/"}
                        className="hover:opacity-80 active:scale-90 duration-200 "
                    >
                        <img
                            src="./resources/logo.png"
                            alt=""
                            className="h-20 w-20"
                        />
                    </Link>

                    <ul className="hidden lg:flex menu menu-horizontal px-1 text-lg">
                        <li>
                            <Link to={"/news"}>News {date}</Link>
                        </li>
                        <li>
                            <Link to={"/weather"}>Weather</Link>
                        </li>

                        <li>
                            <details>
                                <summary>Farm Aids</summary>
                                <ul className="p-2 w-52 rounded-t-none  bg-[#E7E1C7]">
                                    <li>
                                        <Link to={"/price"}>
                                            Prices of Daily Commodities
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="https://www.amazon.in/s?k=farming">
                                            Shop Farm Equipment
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.deere.com/en/agriculture">
                                            {" "}
                                            Procure Farm Machinery
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <div className="flex items-stretch">
                        {props.name !== "" ? (
                            <div className="dropdown dropdown-end">
                                    <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost rounded-btn "
                                >
                                  <span className="capitalize text-lg p-2 rounded-xl hover:bg-slate-800 hover:text-white">
                                          Welcome, {props.name}
                                    </span>
                                </div>
                                   <ul
                                  tabIndex={0}
                                    className="menu dropdown-content z-[1] p-2 shadow  rounded-box w-52 mt-4  bg-[#E7E1C7]"
                                >
                                    <li className="text-base">
                                        <Link to={"/dashboard"}>Dashboard</Link>
                                    </li>
                                    <li className="text-base">
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </ul> 
                            </div>
                        ) : (
                            <Link to={"/login"} className="btn btn-ghost">
                                <div className="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-3xl">
                                        face
                                    </span>
                                    <span>Login?</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mobileNav lg:hidden block">
                    <div className="drawer drawer-end">
                        <input
                            id="my-drawer-4"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label
                                htmlFor="my-drawer-4"
                                className="drawer-button btn"
                            >
                                <span class="material-symbols-outlined">
                                    menu
                                </span>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="close sidebar"
                                className="drawer-overlay"
                            ></label>
                            <ul className="menu p-4 w-80 min-h-full bg-[#dde7c7] text-black flex flex-col items-center">
                                {/* Sidebar content here */}
                                <li className="text-3xl font-cabin text-center font-bold">
                                    Agro Field Tech.
                                </li>
                                <li className="mt-5">
                                    <div className="flex items-stretch">
                                        {props.name !== "" ? (
                                            <div className="">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn btn-ghost rounded-btn "
                                                >
                                                    <span className="capitalize text-lg">
                                                        Welcome, {props.name}
                                                    </span>
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu dropdown-content z-[1] p-2 shadow  rounded-box mt-4 w-44 bg-[#E7E1C7]"
                                                >
                                                    <li className="text-base">
                                                        <Link to={"/dashboard"}>
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                    <li className="text-base">
                                                        <button
                                                            onClick={logout}
                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link
                                                to={"/login"}
                                                className="btn btn-ghost"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-3xl">
                                                        face
                                                    </span>
                                                    <span>Login?</span>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </li>
                                <li className="text-xl mt-5">
                                    <Link to={"/news"}>News Today</Link>
                                </li>
                                <li className="text-xl">
                                    <Link to={"/weather"}>Weather</Link>
                                </li>
                                <li className="text-xl">
                                    <details>
                                        <summary>Farm Aids</summary>
                                        <ul className="p-2 w-full rounded-t-none text-base">
                                            <li>
                                                <Link to={"/price"}>
                                                    Prices of Daily Commodities
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="https://www.amazon.in/s?k=farming">
                                                    Shop Farm Equipment
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.deere.com/en/agriculture">
                                                    Procure Farm Machinery
                                                </a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Header;
