import { Column } from "../../model";
import SearchTable from "../../components/Table/SearchTable";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { DeclarationDetailsDTO } from "../../../../backend/models/types/declaration";
import API from "../../api";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import DispatchAlert from "../../components/AlertBox/dispatchAlert";

const titles: Array<Column> = [
  {
    key: "courseName",
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
  const [declarationDetails, setDeclarationDetails] =
    useState<DeclarationDetailsDTO | null>(null);
  const { declarationId } = useParams();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    API.retrieveDeclaration(declarationId!).then((res) => {
      setDeclarationDetails(res);
      setDisabled(res.state !== "Προσωρινή αποθήκευση");
    });
  }, [declarationId, userData.authToken]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpenModal(true);
  };

  const handleConfirm = () => {
    API.confirmDeclaration(declarationId!, declarationDetails!)
      .then(() => {
        DispatchAlert("Η δήλωση υποβλήθηκε επιτυχώς!", "", "success");
        navigate("/declarations");
      })
      .catch((err) =>
        DispatchAlert(
          "Η δήλωση δεν έχει υποβληθεί!",
          "Προέκυψε σφάλμα κατά την υποβολή της δήλωσης. Προσπαθήστε ξανά.",
          "error"
        )
      );
  };

  const handleRemoveCourse = (courseId: string) => {
    const newCourses = declarationDetails?.courses.filter(
      (course) => course.courseId !== courseId
    );
    declarationDetails &&
      setDeclarationDetails({
        ...declarationDetails,
        courses: newCourses ?? [],
      });
  };

  return declarationDetails &&
    declarationDetails.state === "Προσωρινή αποθήκευση" ? (
    <>
      <ConfirmationModal
        text="Είστε σίγουροι ότι θέλετε να υποβάλετε τη δήλωση;"
        open={openModal}
        onOpen={setOpenModal}
        onConfirm={handleConfirm}
      />
      <Box className="wrapper">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Δήλωση: {declarationDetails && declarationDetails.examPeriod}
        </Typography>
        <Box className="header">
          <Typography variant="body1">
            Για να προσθέσετε ένα μάθημα επιστρέψτε στη λίστα μαθημάτων.
          </Typography>
        </Box>
        <SearchTable
          columns={titles}
          rows={declarationDetails?.courses ?? []}
          totalResults={declarationDetails?.courses.length ?? 0}
          actions={["delete"]}
          onRemoveCourse={(courseId) => handleRemoveCourse(courseId)}
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
  ) : (
    <>
      <Box className="wrapper">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Δήλωση: {declarationDetails && declarationDetails.examPeriod}
        </Typography>
        <SearchTable
          columns={titles}
          rows={declarationDetails?.courses ?? []}
          totalResults={declarationDetails?.courses.length ?? 0}
          actions={[]}
        />
      </Box>
    </>
  );
};

export default Declaration;
