import { useLoaderData } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage() {
  const address = useLoaderData();

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 8,
        mb: 8,
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ p: 6 }}>
        {/* --- 1. ICON & STATUS --- */}
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 1 }} />

        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mt: 2, mb: 1 }}
        >
          Whoops! Page <strong>{address}</strong> Not Found
        </Typography>

        {/* --- 2. EXPLANATION --- */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We're sorry, the page you requested could not be found. It may have
          been moved or deleted.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* --- 3. GUIDANCE (Call to Actions) --- */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Primary Action */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            // Placeholder: Use React Router's navigate('/') here
            onClick={() => (window.location.href = "/")}
          >
            Go Back to Homepage
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
