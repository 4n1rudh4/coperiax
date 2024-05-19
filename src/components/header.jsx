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
                className="navbar px-32 py-2 font-cabin sticky top-0 z-[100] bg-[#E7E1C7]  text-base"
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

                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li>
                            <Link to={"/news"}>News Today</Link>
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
                <div className="flex-none">
                    <div className="flex items-stretch">
                        {props.name !== "" ? (
                            <div className="dropdown dropdown-end">
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
            </motion.div>
        </>
    );
}

export default Header;
