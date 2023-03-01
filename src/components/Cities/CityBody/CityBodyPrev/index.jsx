import React from "react";
import { TableCell, TableRow } from "@mui/material";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deleteCityThunk } from "../../../../Redux/trackSlice";
import { useContext } from "react";
import { EditContext } from "../../../../context";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

export const CityBodyPrev = ({ row }) => {
  const { changeEdit } = useContext(EditContext);
  const dispatch = useDispatch();

  const onDelete = () => {
    console.log(row._id);
    const { _id } = row;
    dispatch(deleteCityThunk({ _id }));
  };
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="table_row"
    >
      <TableCell component="th" scope="row" align="center">
        {row.state.toUpperCase()}
      </TableCell>
      <TableCell align="center" sx={{ padding: "1px", fontSize: "12px" }}>
        {row.city.toUpperCase()}
      </TableCell>
      <TableCell align="center" sx={{ padding: "1px" }}>
        {row.deliveryprice} $
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: "#0F7B0F",
          fontWeight: "600",
          fontSize: "11px",
          padding: "1px",
        }}
      >
        {row.activeport.port.toUpperCase()}
      </TableCell>
      <TableCell align="center">{row.activeport.deliveryPrice} $</TableCell>
      <TableCell align="center">
        <DeleteIcon
          onClick={onDelete}
          sx={{ color: "red", cursor: "pointer" }}
        />
        <SettingsIcon
          onClick={() => changeEdit(row)}
          sx={{ color: "#1F44FF", cursor: "pointer" }}
        />
      </TableCell>
    </TableRow>
  );
};
