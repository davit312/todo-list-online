import { Container, Paper } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper" }}>
          {children}
        </Paper>
      </Container>
    </>
  );
}
