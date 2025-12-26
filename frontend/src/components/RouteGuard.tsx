import { useCallback, useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/user";
import { authHeader } from "../utils/functions";
import PageWrapper from "../ui/PageWrapper";
import { Box, CircularProgress } from "@mui/material";
import { clearUser, setCurrentUser, useUser } from "../features/user/userSlice";
import { getToken } from "../utils/manageToken";

type Props = {
  children: ReactNode;
};

const onlyUsersAllowed = ["/app"];
const usersRejected = ["/login", "/register"];

function RouteGuard({ children }: Props) {
  const user = useUser();
  const isLoggedIn = useCallback(() => user.id !== undefined, [user]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const {
    data: userdata,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(authHeader(getToken() as string), {
    skip: isLoggedIn() || !getToken(),
  });

  //Login hook
  useEffect(
    function () {
      if (!isLoggedIn()) {
        if (userdata?.id) {
          dispatch(setCurrentUser(userdata));
        } else {
          dispatch(clearUser());
        }
      }
    },
    [isLoggedIn, userdata, dispatch]
  );

  // Redirect hook
  useEffect(
    function () {
      if (isLoggedIn()) {
        if (usersRejected.includes(path)) {
          navigate("/app", { replace: true });
        }
      } else {
        if (getToken()) return; // if token exists wait for login
        if (onlyUsersAllowed.includes(path)) {
          navigate("/login", { replace: true });
        }
      }
    },
    [isLoggedIn, path, navigate]
  );

  if (isError) return "ERROR loading user";

  if (isLoading) {
    return (
      <PageWrapper>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  return children;
}

export default RouteGuard;
