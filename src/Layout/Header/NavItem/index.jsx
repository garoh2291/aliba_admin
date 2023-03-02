import { NavLink } from "react-router-dom";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalculateIcon from "@mui/icons-material/Calculate";
import "./styles.css";

const renderIcon = (link) => {
  if (link === "") {
    return <DirectionsBusIcon />;
  } else if (link === "port") {
    return <LocalShippingIcon />;
  } else if (link === "calculate") {
    return <CalculateIcon />;
  } else {
    return <MonetizationOnIcon />;
  }
};

export const NavItem = ({ link, label }) => {
  return (
    <li className="nav_item">
      <NavLink
        end
        to={`/${link}`}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        {renderIcon(link)}
        {label}
      </NavLink>
    </li>
  );
};
