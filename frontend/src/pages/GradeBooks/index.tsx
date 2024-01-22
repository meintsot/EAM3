import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import { Add } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import { GradesRow, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const titles: Array<Column> = [
  {
    key: "_id",
    label: "Κωδικός βαθμολογίου",
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
    key: "courseId",
    label: "Κωδικός μαθήματος",
    searchInputType: "dropdown",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "state",
    label: "Κατάσταση βαθμολογίου",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "examPeriod",
    label: "Εξεταστική περίοδος",
    searchInputType: "dropdown",
    options: ["Ιανουάριος 23-24", "Ιούνιος 22-23", "Σεπτεμβριος 23-24"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const GradeBooks = () => {
  const { userData } = useAuth();
  const { userType } = userData;
  const [gradebooks, setGradebooks] = useState([]);

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Βαθμολόγια
      </Typography>
      <Box className="header">
        <Typography variant="body1">
          Για να ξεκινήσετε μία δήλωση επιλέξτε ένα μάθημα κάνοντας κλικ στο
          αντίστοιχο κουτάκι.
        </Typography>
        <Button
          variant="contained"
          className="main-action-button"
          onClick={() => {}}
          sx={{ fontWeight: "bold" }}
        >
          νεο βαθμολογιο <Add fontSize="small" />
        </Button>
      </Box>
      <SearchTable
        columns={titles}
        rows={gradebooks}
        setRows={setGradebooks}
        actions={["view", "checkbox"]}
      />
    </Box>
  );
};

export default GradeBooks;
