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
import { Filters, SearchTableProps } from "../../../model";
import BasicInput from "../../Input/BasicInput";
import DropdownInput from "../../Input/DropdownInput";
import ActionButton from "../../ActionButton";
import CheckBox from "../../CheckBox";
import { CoursesForDeclaration } from "../../../../../backend/models/types/declaration";
import { useLocation, useNavigate } from "react-router-dom";

const SearchTable: React.FC<SearchTableProps> = ({
  columns,
  rows,
  actions,
  totalResults,
  onCheckedCourses,
  onFilterChange,
  onRemoveCourse,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkedCourses, setCheckedCourses] = useState<
    Array<CoursesForDeclaration>
  >([]);
  const [filters, setFilters] = useState<Filters>({ page: 1, pageSize: 10 });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    filters["page"] = newPage + 1;
    if (onFilterChange) onFilterChange(filters);
    setPage(newPage);
  };

  const handleFilterChange = (id: string, value: string) => {
    console.log(id, value);
    filters[id] = value;
    if (onFilterChange) {
      onFilterChange(filters);
    }
    setFilters(filters);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheck = (
    event: boolean,
    courseId: string,
    courseName: string
  ) => {
    let newCheckedCourses = [];
    if (event)
      newCheckedCourses = [
        ...checkedCourses,
        { courseId, courseName } as CoursesForDeclaration,
      ];
    else
      newCheckedCourses = checkedCourses.filter(
        (course) => course.courseId !== courseId
      );
    if (onCheckedCourses) onCheckedCourses(newCheckedCourses);
    setCheckedCourses(newCheckedCourses);
  };

  const returnAction = (
    action: string,
    courseId?: string,
    courseName?: string,
    declarationId?: string,
    gradebookId?: string
  ) => {
    switch (action) {
      case "view":
        return (
          <ActionButton
            type={action}
            onClick={() => {
              pathname.split("/").indexOf("declarations") > -1
                ? navigate(`/declarations/${declarationId}`)
                : pathname.split("/").indexOf("declarations") > -1
                ? navigate(`/gradebooks/${gradebookId}`)
                : navigate(`/courses/${courseId}`);
            }}
            tooltip="Λεπτομέρειες"
          />
        );
      case "add":
        return (
          <ActionButton
            type={action}
            onClick={() => {
              navigate("create-gradebook");
            }}
            tooltip="Δημιουργία βαθμολογίου"
          />
        );
      case "edit":
        return (
          <ActionButton
            type={action}
            onClick={() => {
              pathname.split("/").indexOf("declarations") > -1
                ? navigate(`/declarations/${declarationId}`)
                : navigate(`/gradebooks/${gradebookId}`);
            }}
            tooltip="Συνέχεια επεξεργασίας"
          />
        );
      case "delete":
        return (
          <ActionButton
            type={action}
            onClick={() => {
              onRemoveCourse && onRemoveCourse(courseId!);
            }}
            tooltip="Αφαίρεση μαθήματος"
          />
        );
      case "checkbox":
        return (
          <CheckBox
            onChange={(e) => handleCheck(e, courseId!, courseName!)}
            tooltip="Δήλωση μαθήματος"
          />
        );
      case "input":
        return (
          <Box sx={{ width: "96px", pl: 2 }}>
            <BasicInput
              id="grade"
              onChange={() => {}}
              size="small"
              defaultValue="4"
            />
          </Box>
        );
      default:
        return <></>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
      }}
    >
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) =>
                column.key === "actions" ? (
                  actions.map(() => (
                    <TableCell
                      key={column.key}
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.label}
                      <Box sx={{ height: "56px" }}></Box>
                    </TableCell>
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
                          onChange={(id, value) =>
                            handleFilterChange(id, value)
                          }
                          size="small"
                        />
                      ) : column.searchInputType === "dropdown" ? (
                        <DropdownInput
                          id={column.key}
                          placeholder=""
                          items={column.options}
                          onChange={(id, value) =>
                            handleFilterChange(id, value)
                          }
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
            {rows.map((row, index) => (
              <TableRow
                key={row[columns[0].key]}
                sx={
                  row["state"] === "Προσωρινή αποθήκευση"
                    ? { backgroundColor: "draft" }
                    : undefined
                }
              >
                {columns.map((column) => {
                  if (column.key === "actions")
                    return actions.map((action: any) => {
                      if (row["state"] === "Προσωρινή αποθήκευση") {
                        return (
                          <TableCell
                            key={"edit"}
                            component="th"
                            scope="row"
                            sx={{ p: 0 }}
                          >
                            {returnAction(
                              "edit",
                              row.courseId,
                              "",
                              row._id,
                              row._id
                            )}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={action}
                            component="th"
                            scope="row"
                            sx={{ p: 0 }}
                          >
                            {returnAction(
                              action,
                              row.courseId,
                              row.courseName,
                              row._id,
                              row._id
                            )}
                          </TableCell>
                        );
                      }
                    });
                  else
                    return (
                      <TableCell
                        key={row[column.key]}
                        component="th"
                        scope="row"
                      >
                        {row[column.key]}
                      </TableCell>
                    );
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, { label: "All", value: -1 }]}
                colSpan={3}
                count={totalResults}
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
