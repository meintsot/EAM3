import { AlertColor } from "@mui/material";
import { AlertPopUpEvent } from "../../model";

const DispatchAlert = (
  title: string,
  message: string,
  type: AlertColor | undefined = "info",
  timeout: number = 10000
) => {
  const event: AlertPopUpEvent = new CustomEvent("alertPopUp", {
    detail: {
      alertTitle: title,
      alertMessage: message,
      alertType: type,
      alertTimeout: timeout,
    },
  });
  window.dispatchEvent(event);
};

export default DispatchAlert;
