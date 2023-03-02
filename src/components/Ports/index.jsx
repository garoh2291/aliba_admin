import { useDispatch } from "react-redux";
import "./styles.css";
import { useEffect } from "react";
import { setPortThunk } from "../../Redux/trackSlice";
import { PortBody } from "./PortBody";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/token";

export const Ports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cb = () => {
    removeToken();
    navigate("/login");
  };
  useEffect(() => {
    dispatch(setPortThunk({ cb }));
  }, [dispatch]);

  return (
    <div>
      <div className="page_header">
        <h3>Ports</h3>
      </div>
      <PortBody />
    </div>
  );
};
