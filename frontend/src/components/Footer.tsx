import { Box, Typography, Container } from "@mui/material";
export default function Footer() {
  return (
    // The Box is styled to be dark and span the full width
    <Box
      component="footer"
      sx={{
        py: 3, // Vertical padding (padding-top & padding-bottom)
        px: 2, // Horizontal padding (padding-left & padding-right)
        mt: "auto", // This is crucial for pushing the footer to the bottom of the page content
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Typography
            sx={{
              display: "inline",
              textDecoration: "underline",
            }}
          >
            ToDo list react
          </Typography>
          &nbsp;
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
