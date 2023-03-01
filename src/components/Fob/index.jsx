import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../../helpers/token";
import { setFobThunk } from "../../Redux/trackSlice";
export const Fob = () => {
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cb = useCallback(() => {
    removeToken();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    dispatch(setFobThunk({ cb }));
  }, [dispatch, cb]);
  return (
    <div>
      {" "}
      <div className="page_header">
        <h3>FOB</h3>
      </div>
    </div>
  );
};
