import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CssBaseline, Box } from "@mui/material";

function BaseLayout() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default BaseLayout;
