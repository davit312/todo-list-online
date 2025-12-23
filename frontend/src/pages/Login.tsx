import {
  Box,
  Button,
  Paper,
  Link as LinkUI,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../ui/PageWrapper";
import FormErrors from "../components/FormErrors";
import { useState, type SyntheticEvent } from "react";
import { useLoginMutation } from "../services/user";
import { parseForm } from "../utils/functions";
import { pureLabel } from "../utils/values";
import type { LoginError } from "../types/errors";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../features/user/userSlice";

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async function (e: SyntheticEvent) {
    e.preventDefault();
    const form = parseForm(e.target as HTMLFormElement);

    const res = await login({
      email: form.email.valueOf() as string,
      password: form.password.valueOf() as string,
    });

    if (!res?.data?.id) {
      let err = "Login Error";
      if ((res as LoginError)?.data?.error) {
        err = (res as LoginError).data.error;
      }
      setFormErrors([err]);
      return;
    }

    dispatch(setCurrentUser(res.data));
    navigate("/app", { replace: true });
  };

  return (
    <PageWrapper>
      <Paper elevation={8} variant="elevation" sx={{ p: 5 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Login with email
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            slotProps={pureLabel}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            slotProps={pureLabel}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography sx={{ ml: "auto" }}>
            Not have an account?
            <LinkUI to="/register" component={Link} sx={{ paddingX: 1 }}>
              Register
            </LinkUI>
            now.
          </Typography>
          {formErrors.length > 0 ? <FormErrors errors={formErrors} /> : ""}
        </Box>
      </Paper>
    </PageWrapper>
  );
}

export default Login;
