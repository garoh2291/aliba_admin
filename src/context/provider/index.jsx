import { useState } from "react";
import { EditContext, CalcContext } from "../index";

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

export const CalcContextProvider = ({ children }) => {
  const [info, setInfo] = useState({
    carPrice: {
      value: "",
    },
    deliveryPrice: {
      value: "",
    },
    fobPrice: {
      value: "",
    },
    insPrice: {
      value: "",
    },
  });
  const [summary, setSummary] = useState(false);

  return (
    <CalcContext.Provider value={{ info, setInfo, summary, setSummary }}>
      {children}
    </CalcContext.Provider>
  );
};
