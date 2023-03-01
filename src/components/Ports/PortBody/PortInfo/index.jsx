import { PortItem } from "./PortItem";
import "./styles.css";

export const PortInfo = ({ ports, cb }) => {
  return (
    <div className="port_info">
      <div className="port_item head">
        <p>Name</p>
        <p>Price $</p>
        <p>Actions</p>
      </div>
      {ports.map((port) => (
        <PortItem port={port} key={port._id} cb={cb} />
      ))}
    </div>
  );
};
