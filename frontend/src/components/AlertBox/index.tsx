import { useState } from "react";
import { Alert, AlertTitle, AlertColor, Snackbar } from "@mui/material";

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export default function AlertBox() {
  const [alertType, setAlertType] = useState<AlertColor | undefined>("info");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  window.addEventListener("alertPopUp", (e: Event) => {
    console.log(e);
    if (!isCustomEvent(e)) throw new Error("not a custom event");
    if (
      !!e.detail.alertTimeout &&
      !!e.detail.alertTitle &&
      !!e.detail.alertMessage
    ) {
      setAlertTitle(e.detail.alertTitle);
      setAlertMessage(e.detail.alertMessage);
      setAlertType(!!e.detail.alertType ? e.detail.alertType : "info");
      setTimeout(() => setAlertMessage(""), 10000);
    }
  });

  return (
    <Snackbar
      open={!!alertMessage.length}
      sx={{ mt: 12 }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={alertType} variant="filled" sx={{ width: "100%" }}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
