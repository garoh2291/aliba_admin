import React from "react";
import { TableCell, TableRow } from "@mui/material";
import "./styles.css";
export const CityBodyPrev = ({ row }) => {
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
        {row.deliveryPrice}
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
        {row.activePort.port.toUpperCase()}
      </TableCell>
      <TableCell align="center">{row.activePort.deliveryPrice}</TableCell>
    </TableRow>
  );
};
