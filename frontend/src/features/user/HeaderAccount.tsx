import { useSelector } from "react-redux";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

import UserIcon from "../../ui/UserIcon";
import type { User } from "../../types/user";

import store from "../../store";
type RootState = ReturnType<typeof store.getState>;

const gefal = () => false;

function HeaderAccount() {
  const { fullname } = useSelector((store: RootState): User => store.user);

  return gefal() ? (
    <>
      <Button variant="contained" color="success">
        Register
      </Button>
      <Button color="inherit" startIcon={<LoginOutlinedIcon />}>
        Login
      </Button>
    </>
  ) : (
    <UserIcon user={{ fullname }} />
  );
}

export default HeaderAccount;
