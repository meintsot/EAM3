import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TablePagination,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
} from "@mui/material";
import { SearchTableProps } from "../../../model";
import BasicInput from "../../Input/BasicInput";
import DropdownInput from "../../Input/DropdownInput";

const SearchTable: React.FC<SearchTableProps> = ({
  columns,
  rows,
  setRows,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
      }}
    >
      <TableContainer component={Paper} sx={{ width: "100%", m: "24px" }}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) =>
                column.key === "actions" ? (
                  rows[0][column.key].map(() => (
                    <TableCell
                      key={column.key}
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    ></TableCell>
                  ))
                ) : (
                  <TableCell
                    key={column.key}
                    align="left"
                    sx={{ fontWeight: "bold" }}
                  >
                    {column.label}
                    <Box sx={{ mt: 2 }}>
                      {column.searchInputType === "text" ? (
                        <BasicInput
                          id={column.key}
                          placeholder="Πληκτρολόγησε..."
                          onChange={() => {}}
                          size="small"
                        />
                      ) : column.searchInputType === "dropdown" ? (
                        <DropdownInput
                          id={column.key}
                          placeholder=""
                          items={column.options}
                          onChange={() => {}}
                          size="small"
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[columns[0].key]}>
                {columns.map((column) =>
                  column.key === "actions" ? (
                    row[column.key].map((action: any) => {
                      const { component: Component, props } = action;
                      return (
                        <TableCell
                          key={row[column.key]}
                          component="th"
                          scope="row"
                        >
                          <Component {...props} />
                        </TableCell>
                      );
                    })
                  ) : (
                    <TableCell key={row[column.key]} component="th" scope="row">
                      {row[column.key]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchTable;
