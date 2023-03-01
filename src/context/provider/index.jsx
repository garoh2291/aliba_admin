import { useState } from "react";
import { EditContext } from "../index";

export const EditContextProvider = ({ children }) => {
  const [info, setInfo] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const changeEdit = (info) => {
    if (isEditOpen) {
      setInfo(null);
      setIsEditOpen(false);
    } else {
      setInfo(info);
      setIsEditOpen(true);
    }
  };
  return (
    <EditContext.Provider value={{ info, changeEdit, isEditOpen }}>
      {children}
    </EditContext.Provider>
  );
};
