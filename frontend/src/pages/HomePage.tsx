import { Box, Typography, Button, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PageWrapper from "../ui/PageWrapper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function HomePage() {
  const isLoggedIn = useSelector(
    (store: RootState): number | undefined => store.user?.id
  );
  return (
    <PageWrapper>
      <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Box>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Welcome to ToDo List Online
            </Typography>

            <Typography
              variant="h3" // Reduced from h2 to h3 to save vertical space
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Simplify Your Day, Achieve Your Goals.
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {" "}
              {/* Reduced from h6 to body1 */}
              This is the simple, distraction-free way to manage your tasks.
              Stop juggling notes and start focusing on what truly matters.
            </Typography>

            {/* Feature List */}
            <Box sx={{ my: 2 }}>
              {" "}
              {/* Reduced my from 3 to 2 */}
              {["Quick Add tasks in seconds", "Access tasks on any device"].map(
                (feature, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    {" "}
                    {/* Reduced mb */}
                    <CheckCircleOutlineIcon
                      color="primary"
                      sx={{ mr: 1, fontSize: 18 }}
                    />
                    <Typography variant="body2">{feature}</Typography>{" "}
                    {/* Reduced variant size */}
                  </Box>
                )
              )}
            </Box>

            {/* CTA Button */}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={isLoggedIn ? "/app" : "/register"}
              size="medium"
              sx={{ mt: 2, py: 1, px: 3 }}
            >
              {isLoggedIn
                ? "Open ToDo list app"
                : "Start Organizing Now (It's Free!)"}
            </Button>
          </Box>
        </Grid>

        {/* --- Right Column: Visual Placeholder --- */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Grid>
      </Grid>
    </PageWrapper>
  );
}
