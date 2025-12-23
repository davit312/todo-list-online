import { useSelector } from "react-redux";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

import UserIcon from "../ui/UserIcon";
import type { User } from "../types/user";
import type { RootState } from "../store";
import { Link } from "react-router-dom";

function HeaderAccount() {
  const user = useSelector((store: RootState): User => store.user);

  return user.id ? (
    <UserIcon user={user} />
  ) : (
    <>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="success"
      >
        Register
      </Button>
      <Button
        component={Link}
        to="/login"
        color="inherit"
        startIcon={<LoginOutlinedIcon />}
      >
        Login
      </Button>
    </>
  );
}

export default HeaderAccount;
