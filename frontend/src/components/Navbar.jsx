//import {component} from "react";
import React,  { useState } from 'react';
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import {Link} from "react-router-dom"


function Navbar(){
    const [clicked, setClicked] = useState(false);

    const handleClick = () =>{
        setClicked(!clicked);
    }
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Food Link</h1>

                <div className="menu-icons" onClick={handleClick}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={clicked ? "nav-menu active": "nav-menu"}>
                    {MenuItems.map((item, index) =>{
                        return(
                         <li key={index}>
                            <Link className={item.cName} to={item.url}>
                            <i className={item.icon}></i>{item.title}
                            </Link>
                        </li>
                        )
                    })}
                     <button> 
                        <Link to='/guest/signin'>SignIn</Link>
                     </button>
                </ul>
            </nav>
        )
    }

export default Navbar;