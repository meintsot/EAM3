import * as React from "react";
import {
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BasicInput from "../Input/BasicInput";
import DropdownInput from "../Input/DropdownInput";
import { useState } from "react";
import { StepperFormProps } from "../../model";
import { certificateType } from "../../../../backend/models/types/certificate";

const StepperForm: React.FC<StepperFormProps> = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [certificateType, setCertificateType] = useState<string>("");
  const [numberOfReplicas, setNumberOfReplicas] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleCertificateType = (certificateType: string) => {
    setCertificateType(certificateType);
  };

  const handleNumberOfReplicas = (numberOfReplicas: string) => {
    setNumberOfReplicas(parseInt(numberOfReplicas));
  };

  const handleSubmit = () => {
    onSubmit({ type: certificateType as certificateType, numberOfReplicas });
    handleNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const returnStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              mt: "32px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Επιλογή πιστοποιητικού
            </Typography>
            <Typography variant="body1" sx={{ color: "disabled" }}>
              Επιλέξτε το πιστοποιητικό για το οποίο θέλετε να υποβάλετε αίτηση:
            </Typography>
            <Box sx={{ width: 450 }}>
              <DropdownInput
                id="certificate-type"
                onChange={handleCertificateType}
                items={[
                  "Φοιτητικής Ιδιότητας",
                  "Φορολογικής Χρήσης",
                  "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς",
                  "Στρατολογική Χρήση (Συνοπτικό)",
                  "Στρατολογική Χρήση (Aναλυτικό)",
                ]}
                size="small"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="inherit"
                variant="contained"
                onClick={handleBack}
                sx={{ mr: 2 }}
              >
                προηγουμενο
              </Button>
              <Button onClick={handleNext} variant="contained">
                επομενο
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              mt: "32px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Επιλογή αριθμού αντιτύπων
            </Typography>
            <Typography variant="body1" sx={{ color: "disabled" }}>
              Στο παρακάτω πεδίο συμπληρώστε τον αριθμό των αντιτύπων για το
              πιστοποιητικό που μόλις επιλέξατε:
            </Typography>
            <Box sx={{ width: 450 }}>
              <BasicInput
                id="number-of-replicas"
                onChange={(id, value) => handleNumberOfReplicas(value)}
                size="small"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="inherit"
                variant="contained"
                onClick={handleBack}
                sx={{ mr: 2 }}
              >
                προηγουμενο
              </Button>
              <Button onClick={handleNext} variant="contained">
                επομενο
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              mt: "32px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Οριστική υποβολή
            </Typography>
            <Typography variant="body1" sx={{ color: "disabled" }}>
              Πατώντας “υποβολή” η αίτηση σας θα σταλεί στη γραμματεία.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="inherit"
                variant="contained"
                onClick={handleBack}
                sx={{ mr: 2 }}
              >
                προηγουμενο
              </Button>
              <Button onClick={() => handleSubmit()} variant="contained">
                υποβολη
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              mt: "32px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TaskAltIcon sx={{ color: "success.light" }} fontSize="large" /> Η
              αίτησή σας υποβλήθηκε επιτυχώς!
            </Typography>
            <Typography variant="body1" sx={{ color: "disabled" }}>
              Το πιστοποιητικό θα αποσταλεί στη διεύθυνση ηλεκτρονικού
              ταχυδρομείου σας.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleReset} variant="contained">
                επαναληψη
              </Button>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Paper sx={{ width: "97%", p: "16px" }}>
      <>
        <Stepper activeStep={activeStep}>
          <Step key="certificate-type">
            <StepLabel>Τύπος πιστοποιητικού</StepLabel>
          </Step>
          <Step key="number-of-copies">
            <StepLabel>Αριθμός αντιτύπων</StepLabel>
          </Step>
          <Step key="final-submission">
            <StepLabel>Οριστική υποβολή</StepLabel>
          </Step>
          <Step key="complete">
            <StepLabel>Ολοκλήρωση</StepLabel>
          </Step>
        </Stepper>
        {returnStepContent()}
      </>
    </Paper>
  );
};

export default StepperForm;
