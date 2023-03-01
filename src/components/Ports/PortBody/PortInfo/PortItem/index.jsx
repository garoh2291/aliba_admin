import SettingsIcon from "@mui/icons-material/Settings";

export const PortItem = ({ port, cb }) => {
  return (
    <div className="port_item">
      <p>{port.port}</p>
      <p>{port.deliveryPrice}</p>
      <div className="action_wrap">
        <SettingsIcon
          onClick={() => cb(port)}
          sx={{ color: "#1F44FF", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
