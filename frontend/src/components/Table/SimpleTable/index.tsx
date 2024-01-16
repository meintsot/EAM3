import React from "react";
import {
  Box,
  Table,
  TablePagination,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
} from "@mui/material";
import { SimpleTableProps } from "../../../model";

const SimpleTable: React.FC<SimpleTableProps> = ({ titleRows, valueRows }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
      }}
    >
      <TableContainer sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableBody>
            {Object.keys(titleRows).map((key) => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "secondary.text", width: "35%" }}
                >
                  {titleRows[key]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {valueRows[key]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SimpleTable;
