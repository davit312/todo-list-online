import { Box, Button, Paper, Link as LinkUI, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../ui/PageWrapper";
import FormErrors from "../components/FormErrors";
import { useState, type SyntheticEvent } from "react";
import { useLoginMutation } from "../services/user";
import { parseForm } from "../utils/functions";

import { useDispatch } from "react-redux";

import { setCurrentUser } from "../features/user/userSlice";
import type { FetchError } from "../types/errors";
import { setToken } from "../utils/manageToken";
import Input from "../ui/Input";

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async function (e: SyntheticEvent) {
    e.preventDefault();
    const form = parseForm(e.target as HTMLFormElement);

    let errorMsg = "Unlnown login Error";
    try {
      const res = await login({
        email: form.email.valueOf() as string,
        password: form.password.valueOf() as string,
      });

      if (res?.data?.user) {
        setToken(res.data.access_token);
        dispatch(setCurrentUser(res.data.user));

        navigate("/app", { replace: true });
      } else if (res.error) {
        // Promise not always throws error, check result
        if ((res.error as FetchError)?.data.message)
          errorMsg = (res.error as FetchError)?.data.message;
        setFormErrors([errorMsg]);
      }
    } catch {
      setFormErrors([errorMsg]);
    }
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
          <Input label="Email Address" name="email" type="email" />

          <Input name="password" label="Password" type="password" />
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
