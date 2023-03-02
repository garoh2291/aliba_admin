import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles.css";
import { NAVBAR_PAGES } from "../../data";
import { NavItem } from "./NavItem";

const { cities, ports, fob, calc } = NAVBAR_PAGES;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className={`${isOpen ? "opened_header" : ""}`}>
      <div className={`menu_logo`}>
        <MenuIcon
          onClick={toggleOpen}
          sx={{
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
        />
        <h3>Aliba</h3>
      </div>
      <div className="nav_list">
        <NavItem label={cities.label} link={cities.link} />
        <NavItem label={ports.label} link={ports.link} />
        <NavItem label={fob.label} link={fob.link} />
        <NavItem label={calc.label} link={calc.link} />
      </div>
    </header>
  );
};
