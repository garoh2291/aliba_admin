import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../../helpers/token";
import { setFobThunk } from "../../Redux/trackSlice";
import { FobBody } from "./FobBody";
import { FobEdit } from "./FobBody/FobEdit";
export const Fob = () => {
  const [drawer, setDrawer] = useState(false);
  const [editable, setEditable] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFob = (fob) => {
    if (drawer) {
      setDrawer(false);
      setEditable(null);
    } else {
      setDrawer(true);
      setEditable(fob);
    }
  };

  const cb = useCallback(() => {
    removeToken();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    dispatch(setFobThunk({ cb }));
  }, [dispatch, cb]);
  return (
    <div>
      <div className="page_header">
        <h3>FOB</h3>
      </div>
      <FobBody cb={handleFob} />
      {drawer && <FobEdit fob={editable} cb={handleFob} />}
    </div>
  );
};
