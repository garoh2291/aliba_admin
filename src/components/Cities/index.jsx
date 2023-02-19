import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCitiesThunk } from "../../Redux/trackSlice";
import { message, Button, Drawer } from "antd";
import { removeToken } from "../../helpers/token";
import { CityDrawer } from "./CityDrawer";
import { CityBody } from "./CityBody";

export const Cities = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [drawer, setDrawer] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cb = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(setCitiesThunk({ error, cb }));
  }, []);
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: `${message}`,
      duration: 15,
    });
  };

  const changeDrawer = () => {
    setDrawer((prev) => !prev);
  };
  return (
    <div>
      <div className="city_header">
        <h3>Cities</h3>
        <Button onClick={changeDrawer}>Add New City</Button>
        <CityDrawer drawer={drawer} changeDrawer={changeDrawer} />
      </div>
      <div className="city_body">
        <CityBody />
      </div>
    </div>
  );
};
