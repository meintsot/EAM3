import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DropdownInput from "../../components/Input/DropdownInput";

import { Column, Filters } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import { getLastThreeExamPeriods } from "../../helpers/findExamPeriod";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useParams } from "react-router-dom";
import {
  GradingSystemDetailsDTO,
  StudentGradingDetails,
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

const mockGradebook: GradingSystemDetailsDTO = {
  _id: "12345",
  courseName: "Μαθηματικά Πληροφορικής",
  courseId: "878787",
  state: "Προσωρινή αποθήκευση",
  examPeriod: "Ιανουάριος 23-24",
  students: [
    {
      registrationNumber: "1115201700166",
      firstName: "Μάκης",
      lastName: "Ζωγράφος",
      grade: 7,
    },
    {
      registrationNumber: "1115201700156",
      firstName: "Κατερίνα",
      lastName: "Ζέλου",
      grade: 6,
    },
    {
      registrationNumber: "1115201700156",
      firstName: "Κατερίνα",
      lastName: "Χαϊμαντά",
      grade: 3,
    },
    {
      registrationNumber: "1115201900222",
      firstName: "Ζίνα",
      lastName: "Ελευθερίου",
      grade: 10,
    },
  ],
};

const GradeBook = () => {
  const { gradeBookId } = useParams();
  const { userData } = useAuth();
  const [gradebook, setGradebook] = useState<GradingSystemDetailsDTO | null>(
    mockGradebook
  );
  const [studentGrades, setStudentGrades] = useState<StudentGradingDetails[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const [examsPeriod, setExamsPeriod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (gradeBookId) {
      API.retrieveGradingSystem(gradeBookId).then((res) => {
        setGradebook(res);
        setStudentGrades(res.students);
      });
    }
  }, [userData.authToken, gradeBookId]);

  const handleSelect = (id: string, value: string) => {
    setExamsPeriod(value);
  };

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
    API.confirmGradingSystem(gradeBookId!)
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
