import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#3a528e" }}>
      {/* Toolbar organizes the content horizontally */}
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
          }} // Pushes the navigation links to the far right
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            📝 ToDo List Online 🌐
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="success">
            REISTER
          </Button>
          <Button color="inherit">LOGIN</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
