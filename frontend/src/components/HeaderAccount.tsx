import { useDispatch } from "react-redux";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

import UserIcon from "../ui/UserIcon";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, useUser } from "../features/user/userSlice";
import { setToken } from "../utils/manageToken";

function HeaderAccount() {
  const user = useUser();
  const dispathch = useDispatch();
  const navigate = useNavigate();

  return user.id ? (
    <UserIcon
      logoutFn={() => {
        setToken("");
        dispathch(clearUser());
        setTimeout(() => navigate("/", { replace: true }));
      }}
      user={user}
    />
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
