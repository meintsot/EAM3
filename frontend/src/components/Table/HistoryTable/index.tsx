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
import { HistoryTableProps } from "../../../model";

const HistoryTable: React.FC<HistoryTableProps> = ({ rows, onPageChange, totalResults }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (onPageChange) {
      onPageChange(newPage + 1, rowsPerPage);
    }
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
            {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "main.text", fontWeight: "bold", width: "35%" }}
                >
                  {row.action}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={totalResults}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryTable;
