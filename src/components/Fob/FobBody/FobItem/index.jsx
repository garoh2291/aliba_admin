import "./styles.css";
import SettingsIcon from "@mui/icons-material/Settings";

export const FobItem = ({ item, cb }) => {
  return (
    <div className="fob_item">
      <p>{item.minValue}</p>
      <p>{item.maxValue}</p>
      <p>
        {item.additionalFee1}
        {!item.maxValue ? "%" : ""}
      </p>
      <p>{item.additionalFee2}</p>
      <p>{item.additionalFee3}</p>
      <p>{item.additionalFee4}</p>
      <p>
        {" "}
        <SettingsIcon
          onClick={() => cb(item)}
          sx={{ color: "#1F44FF", cursor: "pointer" }}
        />
      </p>
    </div>
  );
};
