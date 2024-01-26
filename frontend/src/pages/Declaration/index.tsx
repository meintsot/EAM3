import { Column } from "../../model";
import SearchTable from "../../components/Table/SearchTable";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CoursesRowStudent } from "../../model";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";

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

const titles: Array<Column> = [
  {
    key: "examPeriod",
    label: "",
    searchInputType: "none",
    options: [""],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Declaration = () => {
  const [courses, setCourses] = useState(defaultData);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleConfirm = () => {
    // ...
  };

  return (
    <>
      <ConfirmationModal
        text="Είστε σίγουροι ότι θέλετε να υποβάλετε τη δήλωση;"
        open={openModal}
        onOpen={setOpenModal}
        onConfirm={handleConfirm}
      />
      <Box className="wrapper">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Δήλωση:
        </Typography>
        <Box className="header">
          <Typography variant="body1">
            Για να προσθέσετε ένα μάθημα επιστρέψτε στη λίστα μαθημάτων.{" "}
          </Typography>
        </Box>
        <SearchTable
          columns={titles}
          rows={courses}
          setRows={setCourses}
          actions={["delete"]}
        />
        <Button
          variant="contained"
          className="main-action-button"
          onClick={handleSubmit}
          sx={{ fontWeight: "bold", mt: "16px", alignSelf: "end" }}
        >
          οριστικη υποβολη
        </Button>
      </Box>
    </>
  );
};

export default Declaration;
