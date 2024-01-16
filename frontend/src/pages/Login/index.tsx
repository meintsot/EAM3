import { Paper, Box, Button, Typography } from "@mui/material";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import { useAuth } from "../../providers/AuthProvider";
import "./Login.css";
import { LoginUserRequestDTO } from '../../../../backend/models/types/user'
import {useState} from "react";

const Login = () => {
  const { login } = useAuth();

  const [userForm, setUserForm] = useState({
    userName: '',
    password: ''
  } as LoginUserRequestDTO);

  const handleLogin = () => {
    login(userForm);
  }

  return (
    <div className="container">
      <Paper className="loginFormContainer">
        <Box className="loginForm">
          <BasicInput
            id="username"
            placeholder="Όνομα χρήστη"
            onChange={(id, value) => { setUserForm({ ...userForm, userName: value}); }}
          />
          <Box className="passwordInput">
            <PasswordInput
              id="password"
              placeholder="Κωδικός"
              onChange={(id, value) => { setUserForm({ ...userForm, password: value }) }}
            />
            <Typography variant="body2" className="link">
              Ξεχάσατε τον κωδικό σας
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" fullWidth onClick={ handleLogin }>
          ΣΥΝΔΕΣΗ
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
