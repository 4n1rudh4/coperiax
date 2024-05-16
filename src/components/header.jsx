import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Header(props) {
    function logout() {
        navigate("/loggedout");
        return signOut(auth);
    }

    const navigate = useNavigate();
    return (
        <>
            <div className="navbar  px-32 py-8  bg-white">
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

                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to={"/news"}>News Today</Link>
                        </li>
                        <li>
                            <Link to={"/weather"}>Weather</Link>
                        </li>

                        <li>
                            <details>
                                <summary>Farm Aids</summary>
                                <ul className="p-2 w-52 bg-base-100 rounded-t-none">
                                    <li>
                                        <a>Prices of Daily Commodities</a>
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
                                    <span className="capitalize">
                                        Welcome, {props.name}
                                    </span>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                                >
                                    <li>
                                        <Link to={"/dashboard"}>Dashboard</Link>
                                    </li>
                                    <li>
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
            </div>
        </>
    );
}

export default Header;
