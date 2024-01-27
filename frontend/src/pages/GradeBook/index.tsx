import {useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DropdownInput from "../../components/Input/DropdownInput";

import {Column, Filters} from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import getLastThreeExamPeriods from "../../helpers/findExamPeriod";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import {useParams} from "react-router-dom";
import {GradingSystemDetailsDTO, StudentGradingDetails} from "../../../../backend/models/types/gradingSystem";
import API from "../../api";

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
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "actions",
    label: "Βαθμός",
    searchInputType: "none",
    options: [],
  },
];

const GradeBook = () => {
  const { gradeBookId } = useParams();
  const { userData } = useAuth();
  const [gradebook, setGradebook] = useState<GradingSystemDetailsDTO | null>(null);
  const [studentGrades, setStudentGrades] = useState<StudentGradingDetails[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [examsPeriod, setExamsPeriod] = useState("");

  useEffect(() => {
    if (gradeBookId) {
      API.retrieveGradingSystem(gradeBookId).then(res => {
        setGradebook(res);
        setDisabled(res.state !== 'pending');
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
    setStudentGrades(studentGrades.filter(studentRow =>
        studentRow.grade === filters['grade'] && studentRow.firstName.includes(filters['firstName']) &&
        studentRow.lastName.includes(filters['lastName']) && studentRow.registrationNumber.includes(filters['registrationNumber'])
    ));
  }

  const handleConfirm = () => {
    API.confirmGradingSystem(gradeBookId!).catch(err => console.log(err));
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
          Βαθμολόγιο:
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
          <Typography variant="body1">
            Συμπηρώστε τον βαθμό κάθε φοιτητή ξεχωριστά ή μεταφορτώστε αρχείο
            csv.
          </Typography>
          <Button
            variant="contained"
            className="main-action-button"
            onClick={() => {}}
            sx={{ fontWeight: "bold" }}
          >
            μεταφορτωση αρχειου
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
          οριστικη υποβολη
        </Button>
      </Box>
    </>
  );
};

export default GradeBook;
