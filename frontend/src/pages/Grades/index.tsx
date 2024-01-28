import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Column, Filters } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import API from "../../api";
import {
  RetrieveStudentGrades,
  RetrieveStudentGradesRequest,
} from "../../../../backend/models/types/studentGrade";

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
    options: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    key: "ects",
    label: "ECTS",
    searchInputType: "text",
    options: [],
  },
  {
    key: "grade",
    label: "Βαθμός",
    searchInputType: "text",
    options: [],
  },
];

const Grades = () => {
  const [gradingResults, setGradingResults] = useState<RetrieveStudentGrades>({
    studentGrades: [],
    total: 0,
  });

  const { userData } = useAuth();

  useEffect(() => {
    API.retrieveStudentGrades({ page: 1, pageSize: 10 }).then((res) =>
      setGradingResults(res)
    );
  }, [userData.authToken]);

  const handleFilterChange = (filters: Filters) => {
    const request = filters as RetrieveStudentGradesRequest;
    API.retrieveStudentGrades(request).then((res) => setGradingResults(res));
  };

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
        rows={gradingResults.studentGrades}
        totalResults={gradingResults.total}
        onFilterChange={handleFilterChange}
        actions={["view", "checkbox"]}
      />
    </Box>
  );
};

export default Grades;
