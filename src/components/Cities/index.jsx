import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCitiesThunk } from "../../Redux/trackSlice";
import { message, Button, Input } from "antd";
import { removeToken } from "../../helpers/token";
import { CityDrawer } from "./CityDrawer";
import { CityBody } from "./CityBody";
import { EditDrawer } from "./EditDrawer";
import { EditContext } from "../../context";
import { generateQuery } from "../../helpers";
import SearchIcon from "@mui/icons-material/Search";

export const Cities = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchSortQuery, setSearchSortQuery] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const { isEditOpen } = useContext(EditContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const cb = () => {
    removeToken();
    navigate("/login");
  };
  const getTasksClosure = (filterEntries) => {
    const newArr = searchSortQuery.filter((item) => {
      return item.queryRoute === filterEntries.queryRoute;
    });
    if (newArr.length === 0) {
      setSearchSortQuery((prev) => {
        return [...prev, filterEntries];
      });
    } else {
      setSearchSortQuery((prev) => {
        return searchSortQuery.map((item) => {
          if (item.queryRoute === filterEntries.queryRoute) {
            return filterEntries;
          }
          return item;
        });
      });
    }
  };

  useEffect(() => {
    const query = generateQuery(searchSortQuery);

    dispatch(setCitiesThunk({ query, error, cb }));
  }, [searchSortQuery, dispatch]);

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

  const searchQuery = (event) => {
    const { value } = event.target;
    getTasksClosure({
      queryRoute: "search",
      queryValue: value,
    });
  };

  return (
    <div>
      {contextHolder}
      <div className="page_header">
        <h3>Cities</h3>
        <Input
          placeholder="Search For City"
          onChange={searchQuery}
          style={{ width: "200px" }}
          prefix={<SearchIcon />}
        />
        <Button onClick={changeDrawer}>Add New City</Button>
        {drawer && <CityDrawer drawer={drawer} changeDrawer={changeDrawer} />}
        {isEditOpen && <EditDrawer />}
      </div>
      <div className="city_body">
        <CityBody />
      </div>
    </div>
  );
};
