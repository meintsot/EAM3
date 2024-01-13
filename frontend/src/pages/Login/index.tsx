import { Paper, Box, Button, Typography } from "@mui/material";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";

import "./Login.css";

function Login() {
  return (
    <div className="container">
      <Paper className="loginFormContainer">
        <Box className="loginForm">
          <BasicInput
            id="username"
            placeholder="Όνομα χρήστη"
            onChange={() => {}}
          />
          <Box className="passwordInput">
            <PasswordInput
              id="password"
              placeholder="Κωδικός"
              onChange={() => {}}
            />
            <Typography variant="body2" className="link">
              Ξεχάσατε τον κωδικό σας
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" fullWidth>
          ΣΥΝΔΕΣΗ
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
