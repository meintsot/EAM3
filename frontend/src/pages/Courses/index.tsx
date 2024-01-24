import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import SearchTable from "../../components/Table/SearchTable";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { CoursesRowStudent, CoursesRowProfessor, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const defaultData: Array<CoursesRowStudent> = [
  {
    courseId: "15100122",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
  {
    courseId: "15100123",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
  {
    courseId: "15100124",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
];

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
  const { userType } = userData;
  const [courses, setCourses] =
    useState<Array<CoursesRowStudent | CoursesRowProfessor>>(defaultData);
  const [coursesToBeDeclared, setCoursesToBeDeclared] = useState<Array<string>>(
    []
  );

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Μαθήματα
      </Typography>

      {userType === "guest" ? (
        <>
          <SearchTable
            columns={titlesStudent}
            rows={courses}
            setRows={setCourses}
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
              onClick={() => {}}
              disabled={coursesToBeDeclared.length <= 0}
              sx={{ fontWeight: "bold" }}
            >
              νεα δηλωση
              <SendIcon fontSize="small" />
            </Button>
          </Box>
          <SearchTable
            columns={titlesStudent}
            rows={courses}
            setRows={setCourses}
            actions={["view", "checkbox"]}
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
            rows={courses}
            setRows={setCourses}
            actions={["add"]}
          />
        </>
      )}
    </Box>
  );
};

export default Courses;
