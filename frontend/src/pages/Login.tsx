import {
  Box,
  Button,
  Paper,
  Link as LinkUI,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PageWrapper from "../ui/PageWrapper";

function Login() {
  return (
    <PageWrapper>
      <Paper elevation={8} variant="elevation" sx={{ p: 5 }}>
        <Box
          component="form"
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
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
        </Box>
      </Paper>
    </PageWrapper>
  );
}

export default Login;
