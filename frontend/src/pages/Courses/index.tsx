import {useEffect, useState} from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import SearchTable from "../../components/Table/SearchTable";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuth } from "../../providers/AuthProvider";
import {Column, CoursesResults, Filters} from "../../model";
import API from "../../api";
import {MyCoursesRequest, RetrieveCoursesRequest} from "../../../../backend/models/types/course";
import {CoursesForDeclaration, SubmitDeclarationRequest} from "../../../../backend/models/types/declaration";

const titlesStudent: Array<Column> = [
  { key: "courseId", label: "Κωδικός", searchInputType: "text", options: [] },
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
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "category",
    label: "Κατηγορία",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "professor",
    label: "Διδάσκων",
    searchInputType: "text",
    options: [],
  },
  { key: "ects", label: "ECTS", searchInputType: "text", options: [] },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const titlesProfessor: Array<Column> = [
  { key: "courseId", label: "Κωδικός", searchInputType: "text", options: [] },
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
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "category",
    label: "Κατηγορία",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Courses = () => {
  const { userData } = useAuth();

  const [coursesResults, setCoursesResults] = useState<CoursesResults>()

  useEffect(() => {
    const authToken = userData.authToken;
    if (authToken) {
      API.retrieveStudentCourses({ page: 1, pageSize: 5 }).then((res) => {
        setCoursesResults(res);
      });
    }
  }, [userData]);

  const { userType } = userData;
  const [coursesToBeDeclared, setCoursesToBeDeclared] = useState<Array<CoursesForDeclaration>>(
    []
  );

  const handleFilterChange = (filters: Filters) => {
    if (userType === 'student') {
      const request = filters as RetrieveCoursesRequest;
      API.retrieveStudentCourses(request).then((res) => {
        setCoursesResults(res);
      });
    } else {
      const request = filters as MyCoursesRequest;
      API.myCourses(request).then((res) => {
        setCoursesResults(res);
      });
    }
  }

  const submitDeclaration = () => {
    API.submitDeclaration({
      examPeriod: '',
      courses: coursesToBeDeclared
    } as SubmitDeclarationRequest);
  }

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Μαθήματα
      </Typography>

      {userType === "guest" ? (
        <>
          <SearchTable
            columns={titlesStudent}
            rows={coursesResults?.courses ?? []}
            onFilterChange={handleFilterChange}
            totalResults={coursesResults?.total ?? 0}
            actions={["view"]}
          />
        </>
      ) : userType === "student" ? (
        <>
          <Box className="header">
            <Typography variant="body1">
              Για να ξεκινήσετε μία δήλωση επιλέξτε ένα μάθημα κάνοντας κλικ στο
              αντίστοιχο κουτάκι.
            </Typography>
            <Button
              variant="contained"
              className="main-action-button"
              onClick={() => submitDeclaration()}
              disabled={coursesToBeDeclared.length <= 0}
              sx={{ fontWeight: "bold" }}
            >
              νεα δηλωση
              <SendIcon fontSize="small" />
            </Button>
          </Box>
          <SearchTable
            columns={titlesStudent}
            rows={coursesResults?.courses ?? []}
            actions={["view", "checkbox"]}
            onFilterChange={handleFilterChange}
            totalResults={coursesResults?.total ?? 0}
            onCheckedCourses={setCoursesToBeDeclared}
          />
        </>
      ) : (
        <>
          <Box className="header">
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Για να δημιουργήσετε ένα νέο βαθμολόγιο επίλεξτε το
              <AddCircleOutlineIcon />
              στο αντίστοιχο μάθημα.
            </Typography>
          </Box>
          <SearchTable
            columns={titlesProfessor}
            rows={coursesResults?.courses ?? []}
            totalResults={userData.myCourses?.length ?? 0}
            onFilterChange={handleFilterChange}
            actions={["add"]}
          />
        </>
      )}
    </Box>
  );
};

export default Courses;
