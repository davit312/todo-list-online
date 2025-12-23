import { useState, type SyntheticEvent } from "react";

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
import { useCreateUserMutation } from "../services/user";
import type { FetchError } from "../types/errors";
import FormErrors from "../components/FormErrors";
import { parseForm } from "../utils/functions";
import { pureLabel } from "../utils/values";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/user/userSlice";

function Register() {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async function (e: SyntheticEvent) {
    e.preventDefault();

    const errors: string[] = [];

    const form = parseForm(e.target as HTMLFormElement);

    if (form.password !== form.repeatPassword) {
      errors.push("Passwords not match");
    }

    form.fullname = (form.fullname as string).trim();
    if (form.fullname.length === 0) {
      errors.push("Empty fullname not allowed");
    }

    if ((form.password as string).length < 6) {
      errors.push("Password must contain at least 6 symbols");
    }

    setFormErrors(errors);
    if (errors.length > 0) {
      return;
    }

    try {
      const res = await createUser({
        email: form.email as string,
        fullname: form.fullname,
        password: form.password as string,
      }).unwrap();

      dispatch(setCurrentUser(res));
      navigate("/app", { replace: true });
    } catch (err) {
      setFormErrors([(err as FetchError).data?.message as string]);
    }
  };

  return (
    <PageWrapper>
      <Paper elevation={8} variant="elevation" sx={{ p: 5 }}>
        <Box
          component="form"
          method="post"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Create new account
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Fullname"
            name="fullname"
            autoComplete="fullname"
            slotProps={pureLabel}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            slotProps={pureLabel}
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            slotProps={pureLabel}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            slotProps={pureLabel}
            label="Repeat Password"
            type="password"
            id="repeatPassword"
            autoComplete="repeatPassword"
          />

          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>

          <Typography sx={{ ml: "auto" }}>
            Click on
            <LinkUI component={Link} to="/login" sx={{ paddingX: 1 }}>
              Login
            </LinkUI>
            if you already have an account.
          </Typography>
          {formErrors.length > 0 && <FormErrors errors={formErrors} />}
        </Box>
      </Paper>
    </PageWrapper>
  );
}

export default Register;
