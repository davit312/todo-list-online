import { useDispatch, useSelector } from "react-redux";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

import UserIcon from "../ui/UserIcon";
import type { User } from "../types/user";
import type { RootState } from "../store";
import { Link } from "react-router-dom";
import { clearUser } from "../features/user/userSlice";
import { TOKEN_KEY_NAME } from "../utils/values";

function HeaderAccount() {
  const user = useSelector((store: RootState): User => store.user);
  const dispathch = useDispatch();
  const logOutAction = clearUser;

  return user.id ? (
    <UserIcon
      logoutFn={() => {
        console.log("logouttt");
        dispathch(logOutAction());
        localStorage.setItem(TOKEN_KEY_NAME, "");
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
