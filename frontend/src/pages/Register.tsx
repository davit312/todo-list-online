import { useState, type SyntheticEvent } from "react";

import { Box, Button, Paper, Link as LinkUI, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../ui/PageWrapper";
import { useCreateUserMutation } from "../services/user";
import type { FetchError } from "../types/errors";
import FormErrors from "../components/FormErrors";
import { parseForm } from "../utils/functions";
import { setToken } from "../utils/manageToken";
import { setCurrentUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import Input from "../ui/Input";

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

      setToken(res.access_token);
      dispatch(setCurrentUser(res.user));

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

          <Input label="Fullname" name="fullname" />
          <Input label="Email Address" name="email" type="email" />
          <Input name="password" label="Password" type="password" />
          <Input
            name="repeatPassword"
            label="Repeat Password"
            type="password"
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
