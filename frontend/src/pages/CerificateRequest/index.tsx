import React from "react";
import StepperForm from "../../components/StepperForm";
import { Box, Typography } from "@mui/material";

const CertificateRequest: React.FC = () => {
  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Αίτηση Πιστοποιητικού
      </Typography>
      <StepperForm />
    </Box>
  );
};

export default CertificateRequest;
