import { useDispatch } from "react-redux";
import "./styles.css";
import { useEffect } from "react";
import { setPortThunk } from "../../Redux/trackSlice";
import { PortBody } from "./PortBody";

export const Ports = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPortThunk());
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
