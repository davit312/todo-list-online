import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/user";
import { authHeader } from "../utils/functions";
import PageWrapper from "../ui/PageWrapper";
import { Box, CircularProgress } from "@mui/material";
import { clearUser, setCurrentUser, useUser } from "../features/user/userSlice";
import useToken from "../utils/useToken";

type Props = {
  children: ReactNode;
};

const onlyUsersAllowed = ["/app"];
const usersRejected = ["/login", "/register"];

function RouteGuard({ children }: Props) {
  const user = useUser();
  const isLoggedIn = user.id !== undefined;

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { token } = useToken();

  const {
    data: userdata,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(authHeader(token as string), {
    skip: isLoggedIn || !token,
  });

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (isError) {
        dispatch(clearUser());
      }
      if (userdata?.id) {
        dispatch(setCurrentUser(userdata));
      }
      if (isLoggedIn) {
        if (usersRejected.includes(path)) {
          navigate("/app", { replace: true });
        }
      } else {
        if (token) return; // waait to auto login result
        if (onlyUsersAllowed.includes(path)) {
          navigate("/login", { replace: true });
        }
      }
    },
    [isLoggedIn, isError, path, token, userdata, dispatch, navigate]
  );

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
