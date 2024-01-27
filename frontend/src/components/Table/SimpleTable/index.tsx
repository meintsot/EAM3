import React from "react";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import { SimpleTableProps } from "../../../model";

const SimpleTable: React.FC<SimpleTableProps> = ({ titleRows, valueRows }) => {
  const returnText = (rowTitle: string, value: any) => {
    switch (rowTitle) {
      case "teachingHours":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
              }}
            >
              <Typography sx={{ color: "secondary.text" }} variant="body2">
                Ώρες Θεωρίας:
              </Typography>
              <Typography variant="body2">{value.theory}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
              }}
            >
              <Typography sx={{ color: "secondary.text" }} variant="body2">
                Ώρες Φροντιστηρίου:
              </Typography>
              <Typography variant="body2">{value.tutoring}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
              }}
            >
              <Typography sx={{ color: "secondary.text" }} variant="body2">
                Ώρες Εργαστηρίου:
              </Typography>
              <Typography variant="body2">{value.lab}</Typography>
            </Box>
          </Box>
        );
      case "majors":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {value.map((course: any) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "6px",
                }}
              >
                <Typography variant="body2">{course.majorType}:</Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {course.cardinality}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      case "relevantCourses":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
                alignItems: "start",
              }}
            >
              <Typography variant="body2" sx={{ color: "secondary.text" }}>
                Υποχρεωτικά προαπαιτούμενα:
              </Typography>
              <Typography variant="body2">
                {value.mandatory.join(", ")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
                alignItems: "start",
              }}
            >
              <Typography variant="body2" sx={{ color: "secondary.text" }}>
                Προαιρετικά προαπαιτούμενα:
              </Typography>
              <Typography variant="body2">
                {value.optional.join(", ")}
              </Typography>
            </Box>
          </Box>
        );
      case "links":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {value.map((link: any) => (
              <Typography variant="body2" key={link.names}>
                <a href={link.url}>{link.name}</a>
              </Typography>
            ))}
          </Box>
        );
      case "bibliography":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {value.map((bibliography: any, index: number) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "6px",
                  alignItems: "start",
                }}
              >
                <Typography variant="body2" key={bibliography}>
                  {index + 1}.
                </Typography>
                <Typography variant="body2" key={bibliography}>
                  {bibliography}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      default:
        return value;
    }
  };

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
                  {returnText(key, valueRows[key])}
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
