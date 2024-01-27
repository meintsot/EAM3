import { Column } from "../../model";
import SearchTable from "../../components/Table/SearchTable";
import {useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import {DeclarationDetailsDTO} from "../../../../backend/models/types/declaration";
import API from "../../api";
import {useAuth} from "../../providers/AuthProvider";
import {useParams} from "react-router-dom";

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
  const { userData } = useAuth();
  const [declarationDetails, setDeclarationDetails] = useState<DeclarationDetailsDTO | null>(null);
  const { declarationId } = useParams();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    API.retrieveDeclaration(declarationId!).then(res => {
      setDeclarationDetails(res);
      setDisabled(res.state !== 'pending');
    });
  }, [declarationId, userData.authToken]);

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleConfirm = () => {
    API.confirmDeclaration(declarationId!).catch(err => console.log(err));
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
          rows={declarationDetails?.courses ?? []}
          totalResults={declarationDetails?.courses.length ?? 0}
          actions={["delete"]}
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

export default Declaration;
