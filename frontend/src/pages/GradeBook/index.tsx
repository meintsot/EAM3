import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DropdownInput from "../../components/Input/DropdownInput";

import { Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import getLastThreeExamPeriods from "../../helpers/findExamPeriod";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";

const defaultData = [
  {
    registrationNumber: "123",
    firstName: "Harry",
    lastName: "Potter",
    grade: "",
  },
  {
    registrationNumber: "123",
    firstName: "Harry",
    lastName: "Potter",
    grade: "",
  },
  {
    registrationNumber: "123",
    firstName: "Harry",
    lastName: "Potter",
    grade: "",
  },
];

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
  const { userData } = useAuth();
  const { userType } = userData;
  const [gradebooks, setGradebooks] = useState(defaultData);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [examsPeriod, setExamsPeriod] = useState("");

  const handleSelect = (id: string, value: string) => {
    setExamsPeriod(value);
  };

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleConfirm = () => {
    // ...
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
          rows={gradebooks}
          setRows={setGradebooks}
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
