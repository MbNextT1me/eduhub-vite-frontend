import { Container } from "@mui/material";

export const PageShell = ({ type, children }) => {
  if (type === "public") {
    return <Container maxWidth="xs">{children}</Container>;
  }

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      {children}
    </Container>
  );
};
