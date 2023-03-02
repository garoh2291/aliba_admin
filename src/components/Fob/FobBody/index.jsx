import { Spin } from "antd";
import { useSelector } from "react-redux";
import { FobItem } from "./FobItem";
import "./styles.css";

export const FobBody = ({ cb }) => {
  const { fob, status } = useSelector((state) => state.track);
  if (status !== "resolved" || !fob) {
    return (
      <Spin tip="Loading..." style={{ width: "100%", height: "100%" }}></Spin>
    );
  }
  const sorter = (a, b) => {
    if (+a.minValue > +b.minValue) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="fob_wrapper">
      <div className="fob_item head">
        <p>Minimum</p>
        <p>Maximum</p>
        <p>Fee 1</p>
        <p>Fee 2</p>
        <p>Fee 3</p>
        <p>Fee 4</p>
        <p></p>
      </div>
      {[...fob].sort(sorter).map((item) => (
        <FobItem key={item._id} item={item} cb={cb} />
      ))}
    </div>
  );
};
