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

function Register() {
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat Password"
            type="password"
            id="repeat-password"
            autoComplete="repeat-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
          >
            Register
          </Button>

          <Typography sx={{ ml: "auto" }}>
            Click on
            <LinkUI component={Link} to="/login" sx={{ paddingX: 1 }}>
              Login
            </LinkUI>
            if you already have an account.
          </Typography>
        </Box>
      </Paper>
    </PageWrapper>
  );
}

export default Register;
