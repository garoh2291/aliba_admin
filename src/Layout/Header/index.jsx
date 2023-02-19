import React, { useState } from "react";
import "./styles.css";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className={`${isOpen ? "opened_header" : ""}`}>
      <div className={`menu_logo`}>
        <div className="toggle" onClick={toggleOpen}></div>
        <h3>Aliba</h3>
      </div>
    </header>
  );
};
