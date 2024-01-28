import { useEffect, useState, useRef } from "react";
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

import "./CreateGradeBook.css";

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

const CreateGradeBook = () => {
  const { gradeBookId } = useParams();
  const { userData } = useAuth();
  const [gradebook, setGradebook] = useState<GradingSystemDetailsDTO | null>(
    null
  );
  const [studentGrades, setStudentGrades] = useState<StudentGradingDetails[]>(
    []
  );
  const [disabled, setDisabled] = useState(true);
  const [examsPeriod, setExamsPeriod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (gradeBookId) {
      API.retrieveGradingSystem(gradeBookId).then((res) => {
        setGradebook(res);
        setDisabled(res.state !== "Προσωρινή αποθήκευση");
        setStudentGrades(res.students);
      });
    }
  }, [userData.authToken, gradeBookId]);

  const handleSelect = (id: string, value: string) => {
    setExamsPeriod(value);
  };

  const handleSubmit = () => {
    navigate(`/gradebooks/${gradeBookId}`);
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
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Δημιουργία Βαθμολογίου
      </Typography>
      <Box sx={{ width: 300 }}>
        <DropdownInput
          items={getLastThreeExamPeriods()}
          id="examsPeriod"
          onChange={handleSelect}
          size="small"
          placeholder="Εξεταστική περίοδος"
        />
      </Box>
      <Box className="header">
        <Typography variant="body1">Μεταφορτώστε αρχείο csv.</Typography>
        <Button
          variant="contained"
          className="main-action-button"
          onClick={() =>
            (document?.querySelector("#upload") as HTMLElement)?.click()
          }
          sx={{ fontWeight: "bold" }}
        >
          μεταφορτωση αρχειου
          <input
            id="upload"
            name="upload"
            type="file"
            hidden
            onChange={() => {
              setGradebook(mockGradebook);
              setDisabled(false);
            }}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <FileUploadOutlinedIcon fontSize="small" />
        </Button>
      </Box>
      <SearchTable
        columns={titles}
        rows={gradebook?.students ?? []}
        totalResults={gradebook?.students?.length ?? 0}
        onFilterChange={handleFilterChange}
        actions={["input"]}
      />
      <Button
        variant="contained"
        className="main-action-button"
        onClick={handleSubmit}
        sx={{ fontWeight: "bold", mt: "16px", alignSelf: "end" }}
        disabled={disabled}
      >
        υποβολη
      </Button>
    </Box>
  );
};

export default CreateGradeBook;
