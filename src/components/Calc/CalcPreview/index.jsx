import { useContext } from "react";
import { CalcContext } from "../../../context";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

export const CalcPreview = () => {
  const { info, setSummary } = useContext(CalcContext);
  console.log(info);
  return (
    <div className="preview">
      <div className="close">
        <CloseIcon
          onClick={() => setSummary(false)}
          sx={{
            "&: hover": {
              color: "red",
            },
          }}
        />
      </div>
      <div className="preview_info">
        <p>Car Price</p>
        <p>{info.carPrice.value} $</p>
      </div>
      <div className="preview_info">
        <p>Delivery Price</p>
        <p>{info.deliveryPrice.value} $</p>
      </div>
      <div className="preview_info">
        <p>Action Price</p>
        <p>{info.fobPrice.value} $</p>
      </div>
      <div className="preview_info">
        <p>Insurance Price</p>
        <p>{info.insPrice.value.toFixed(0)} $</p>
      </div>
      <div className="preview_info">
        <p>Commission </p>
        <p>300 $</p>
      </div>
      <div className="preview_info final">
        <p>Final Price </p>
        <p>
          {(
            +info.carPrice.value +
            +info.deliveryPrice.value +
            +info.fobPrice.value +
            +info.insPrice.value
          ).toFixed(0)}
          $
        </p>
      </div>
    </div>
  );
};
