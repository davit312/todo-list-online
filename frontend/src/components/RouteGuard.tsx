import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/user";
import { authHeader } from "../utils/functions";
import PageWrapper from "../ui/PageWrapper";
import { Box, CircularProgress } from "@mui/material";
import { clearUser, setCurrentUser } from "../features/user/userSlice";
import { TOKEN_KEY_NAME } from "../utils/values";

type Props = {
  children: ReactNode;
};

const onlyUsersAllowed = ["/app"];
const usersRejected = ["/login", "/register"];

function RouteGuard({ children }: Props) {
  const isLoggedin = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const token = localStorage.getItem(TOKEN_KEY_NAME) as string;

  const {
    data: userdata,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(authHeader(token), {
    skip: isLoggedin || !token,
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
      if (isLoggedin) {
        if (usersRejected.includes(path)) {
          navigate("/app");
        }
      } else {
        if (token) return; // waait to auto login result
        if (onlyUsersAllowed.includes(path)) {
          navigate("/login");
        }
      }
    },
    [isLoggedin, isError, path, token, userdata, dispatch, navigate]
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
