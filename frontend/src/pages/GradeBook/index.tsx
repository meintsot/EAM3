import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DropdownInput from "../../components/Input/DropdownInput";

import { GradesRow, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import getLastThreeExamPeriods from "../../helpers/findExamPeriod";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";

const titles: Array<Column> = [
  {
    key: "_id",
    label: "Αριθμός μητρώου",
    searchInputType: "text",
    options: [],
  },
  {
    key: "courseName",
    label: "Όνομα",
    searchInputType: "text",
    options: [],
  },
  {
    key: "courseId",
    label: "Επίθετο",
    searchInputType: "text",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "state",
    label: "Βαθμός",
    searchInputType: "none",
    options: [],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const GradeBook = () => {
  const { userData } = useAuth();
  const { userType } = userData;
  const [gradebooks, setGradebooks] = useState([]);
  const [disabled, setDisabled] = useState(false);
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
            onChange={() => {}}
            size="small"
            placeholder="Εξεταστική περίοδος"
          />
        </Box>
        <Box className="header">
          <Typography variant="body1">
            Συμπηρώστε τον βαθμό κάθε φοιτητή ξεχωριστά ή αναφορτώστε αρχείο
            csv.
          </Typography>
          <Button
            variant="contained"
            className="main-action-button"
            onClick={() => {}}
            sx={{ fontWeight: "bold" }}
          >
            αναφορτωση αρχειου
            <FileUploadOutlinedIcon fontSize="small" />
          </Button>
        </Box>
        <SearchTable
          columns={titles}
          rows={gradebooks}
          setRows={setGradebooks}
          actions={["view", "checkbox"]}
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
