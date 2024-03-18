//import {component} from "react";
import React, { useState } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const { isLoggedIn } = useStateContext();

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo font-bold text-3xl">Food Link</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}

        <button>
          <Link  to="/guest/signin">Sign in</Link>
        </button>

        {/* {isLoggedIn ? (
                        <Link className="nav-links" to="/guest/signin">
                            My Account
                        </Link>
                    ) : (
                        <Link className="nav-links" to="/guest/signin">
                            Sign in
                        </Link>
                    )} */}
      </ul>
    </nav>
  );
}

export default Navbar;
