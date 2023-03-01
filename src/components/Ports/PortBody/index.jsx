import { useSelector } from "react-redux";
import { Spin } from "antd";

import "./styles.css";
import { PortInfo } from "./PortInfo";
import { NewPort } from "./NewPort";
import { useState } from "react";
import { EditPort } from "./EditPort";
export const PortBody = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [editable, setEditable] = useState(null);
  const handleSet = (port) => {
    setActiveForm(true);
    setEditable(port);
  };
  const handleChange = () => {
    setActiveForm(false);
    setEditable(null);
  };
  const { status, ports } = useSelector((state) => state.track);
  if (status !== "resolved" && !ports.length) {
    return (
      <Spin tip="Loading..." style={{ width: "100%", height: "100%" }}></Spin>
    );
  }
  return (
    <div className="port_body">
      <PortInfo ports={ports} cb={handleSet} />
      {activeForm ? (
        <EditPort editable={editable} onclose={handleChange} />
      ) : (
        <NewPort />
      )}
    </div>
  );
};
