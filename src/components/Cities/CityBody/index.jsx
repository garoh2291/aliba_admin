import "./styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { CityBodyPrev } from "./CityBodyPrev";

export const CityBody = () => {
  const { cities } = useSelector((state) => state.track);
  console.log(cities);
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "600px",
        mt: 2,
        mb: 2,
        borderRadius: "0",
        boxShadow: "none",
        borderBottom: "1px solid #c7c7c7",
        overflow: "hidden",
        padding: "1px",
      }}
    >
      <Table
        size="small"
        aria-label="a dense table"
        sx={{ overflow: "hidden" }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "600" }}>
              State
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "600", minWidth: 150 }}>
              City
            </TableCell>
            <TableCell sx={{ fontWeight: "600", minWidth: 100 }} align="center">
              Price To Port
            </TableCell>
            <TableCell sx={{ fontWeight: "600", minWidth: 150 }} align="center">
              Port
            </TableCell>
            <TableCell sx={{ fontWeight: "600", minWidth: 100 }} align="center">
              Price From Port
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((row) => (
            <CityBodyPrev key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
