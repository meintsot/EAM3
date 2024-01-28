import React from "react";
import StepperForm from "../../components/StepperForm";
import { Box, Typography } from "@mui/material";
import API from "../../api";
import { SubmitCertificateRequest } from "../../../../backend/models/types/certificate";
import DispatchAlert from "../../components/AlertBox/dispatchAlert";
import AlertBox from "../../components/AlertBox";

const CertificateRequest: React.FC = () => {
  const handleSubmit = (certificate: SubmitCertificateRequest) => {
    API.submitCertificate(certificate)
      .then()
      .catch((err) =>
        DispatchAlert(
          "Η αίτηση δεν έχει υποβληθεί!",
          "Προέκυψε σφάλμα κατά την υποβολή της αίτησης. Προσπαθήστε ξανά.",
          "error"
        )
      );
  };

  return (
    <>
      <AlertBox />
      <Box className="wrapper">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Αίτηση Πιστοποιητικού
        </Typography>
        <StepperForm onSubmit={handleSubmit} />
      </Box>
    </>
  );
};

export default CertificateRequest;
