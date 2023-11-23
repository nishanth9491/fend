import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import "../Navbar/navbar.css";
import femaleImg from "../../assests/female.png";
import Axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div></div>

      <div className="navcenter">
        <Link
          activeClass="active"
          to="today"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="navitems"
        >
          Today
        </Link>

        <Link
          activeClass="active"
          to="implement"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="navitems"
        >
          Add
        </Link>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="navitems"
        >
          Login
        </button>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
