import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderAccount from "../features/user/HeaderAccount";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#3a528e" }}>
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

        <Box sx={{ display: "flex", gap: 2 }}>
          <HeaderAccount />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
