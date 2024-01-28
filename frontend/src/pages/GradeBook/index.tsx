import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";

import { Column, Filters } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useParams } from "react-router-dom";
import {
  StudentGradingDetails, SubmitGradingSystemRequest,
} from "../../../../backend/models/types/gradingSystem";
import API from "../../api";
import DispatchAlert from "../../components/AlertBox/dispatchAlert";
import { useNavigate } from "react-router-dom";

const titles: Array<Column> = [
  {
    key: "registrationNumber",
    label: "Αριθμός μητρώου",
    searchInputType: "text",
    options: [],
  },
  {
    key: "firstName",
    label: "Όνομα",
    searchInputType: "text",
    options: [],
  },
  {
    key: "lastName",
    label: "Επίθετο",
    searchInputType: "text",
    options: [],
  },
  {
    key: "actions",
    label: "Βαθμός",
    searchInputType: "none",
    options: [],
  },
];

const GradeBook = () => {
  const { gradebookId } = useParams();
  const { userData } = useAuth();
  const [gradebook, setGradebook] = useState<SubmitGradingSystemRequest | null>(null);
  const [studentGrades, setStudentGrades] = useState<StudentGradingDetails[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gradebookId) {
      API.retrieveGradingSystem(gradebookId).then((res) => {
        console.log(res);
        setGradebook(res);
        setStudentGrades(res.students);
      });
    }
  }, [userData.authToken, gradebookId]);

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleFilterChange = (filters: Filters) => {
    setStudentGrades(
      studentGrades.filter(
        (studentRow) =>
          studentRow.grade === filters["grade"] &&
          studentRow.firstName.includes(filters["firstName"]) &&
          studentRow.lastName.includes(filters["lastName"]) &&
          studentRow.registrationNumber.includes(filters["registrationNumber"])
      )
    );
  };

  const handleConfirm = () => {
    console.log(gradebook);
    API.confirmGradingSystem(gradebookId!, gradebook!)
      .then(() => {
        DispatchAlert("Το βαθμολόγιο υποβλήθηκε επιτυχώς!", "", "success");
        navigate("/gradebooks");
      })
      .catch((err) =>
        DispatchAlert(
          "Το βαθμολόγιο δεν έχει υποβληθεί!",
          "Προέκυψε σφάλμα κατά την υποβολή του βαθμολογίου. Προσπαθήστε ξανά.",
          "error"
        )
      );
  };

  return (
    <>
      <ConfirmationModal
        text="Είστε σίγουροι ότι θέλετε να υποβάλετε το βαθμολόγιο;"
        open={openModal}
        onOpen={setOpenModal}
        onConfirm={handleConfirm}
      />
      <Box className="wrapper">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Βαθμολόγιο: {}
        </Typography>
        <SearchTable
          columns={titles}
          rows={gradebook?.students ?? []}
          totalResults={gradebook?.students?.length ?? 0}
          onFilterChange={handleFilterChange}
          actions={["input"]}
        />
        {gradebook?.state === "Προσωρινή αποθήκευση" ? (
          <Button
            variant="contained"
            className="main-action-button"
            onClick={handleSubmit}
            sx={{ fontWeight: "bold", mt: "16px", alignSelf: "end" }}
          >
            οριστικη υποβολη
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default GradeBook;
