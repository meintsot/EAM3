import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const titles: Array<Column> = [
  {
    key: "courseId",
    label: "Κωδικός",
    searchInputType: "text",
    options: [],
  },
  {
    key: "courseName",
    label: "Μάθημα",
    searchInputType: "text",
    options: [],
  },
  {
    key: "semester",
    label: "Εξάμηνο",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "ects",
    label: "ECTS",
    searchInputType: "text",
    options: ["Ιανουάριος 23-24", "Ιούνιος 22-23", "Σεπτεμβριος 23-24"],
  },
  {
    key: "grade",
    label: "Βαθμός",
    searchInputType: "text",
    options: [],
  },
];

const Grades = () => {
  const { userData } = useAuth();
  const { userType } = userData;
  const [gradebooks, setGradebooks] = useState([]);

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Βαθμολογίες
      </Typography>
      <Box className="header">
        <Typography variant="body1">ECTS: 180 M.O.: 5.7 </Typography>
        <Button
          variant="contained"
          className="main-action-button"
          onClick={() => {}}
          sx={{ fontWeight: "bold" }}
        >
          εξαγωγη/εκτυπωση <FileDownloadOutlinedIcon fontSize="small" />
        </Button>
      </Box>
      <SearchTable
        columns={titles}
        rows={gradebooks}
        setRows={setGradebooks}
        actions={["view", "checkbox"]}
      />
    </Box>
  );
};

export default Grades;
