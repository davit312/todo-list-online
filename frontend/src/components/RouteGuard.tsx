import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const onlyUsersAllowed = ["/app"];
const usersRejected = ["/login", "/register"];

function RouteGuard({ children }: Props) {
  const isLoggedin = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(
    function () {
      if (isLoggedin) {
        if (usersRejected.includes(path)) {
          navigate("/app");
        }
      } else {
        if (onlyUsersAllowed.includes(path)) {
          navigate("/login");
        }
      }
    },
    [isLoggedin, path, navigate]
  );

  return children;
}

export default RouteGuard;
