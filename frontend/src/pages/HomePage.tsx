import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid, // Ensure this is the modern Grid
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function HomePage() {
  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {" "}
        {/* Reduced my from 6 to 4 */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper" }}>
          {" "}
          {/* Reduced p from 4 to 3 */}
          <Grid
            container
            spacing={{ xs: 3, md: 5 }} // Responsive spacing
            alignItems="center"
          >
            {/* --- Left Column: Text & Call to Action --- */}
            <Grid
              // *** WARNING FIX: Use the 'size' prop for all breakpoints ***
              size={{ xs: 12, md: 7 }}
            >
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
                  {[
                    "Quick Add tasks in seconds",
                    "Access tasks on any device",
                  ].map((feature, index) => (
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
                  ))}
                </Box>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="medium" // Reduced from large to medium
                  sx={{ mt: 2, py: 1, px: 3 }} // Adjusted padding
                  // In a real app, this would navigate to the sign-up or task list page
                  onClick={() => console.log("Navigate to Dashboard/Sign Up")}
                >
                  Start Organizing Now (It's Free!)
                </Button>
              </Box>
            </Grid>

            {/* --- Right Column: Visual Placeholder --- */}
            <Grid
              // *** WARNING FIX: Use the 'size' prop for all breakpoints ***
              size={{ xs: 12, md: 5 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
