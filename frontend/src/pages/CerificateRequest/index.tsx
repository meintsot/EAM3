import React from "react";
import StepperForm from "../../components/StepperForm";
import { Box, Typography } from "@mui/material";
import API from "../../api";
import {SubmitCertificateRequest} from "../../../../backend/models/types/certificate";

const CertificateRequest: React.FC = () => {
    const handleSubmit = (certificate: SubmitCertificateRequest) => {
        API.submitCertificate(certificate).catch(err => console.log(err));
    }

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Αίτηση Πιστοποιητικού
      </Typography>
      <StepperForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default CertificateRequest;
