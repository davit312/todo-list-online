import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import BasicPopover from "../ui/UserIcon";
const gefal = () => false;
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
          {gefal() ? (
            <>
              <Button variant="contained" color="success">
                Register
              </Button>
              <Button color="inherit" startIcon={<LoginOutlinedIcon />}>
                Login
              </Button>
            </>
          ) : (
            <>
              <BasicPopover />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
