import React, { useState } from "react";
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

const SimpleTable: React.FC<SimpleTableProps> = ({
  titleRows,
  valueRows,
  pagination = false,
  type = "info",
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const titleStyle =
    type === "info"
      ? { color: "secondary.text" }
      : { color: "main.text", fontWeight: "bold" };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
      }}
    >
      <TableContainer sx={{ width: "100%" }}>
        <Table aria-label="custom pagination table">
          <TableBody>
            {Object.keys(titleRows).map((key) => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ ...titleStyle, width: "35%" }}
                >
                  {titleRows[key]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {valueRows[key]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {pagination ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={Object.keys(valueRows).length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SimpleTable;
