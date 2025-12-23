import { Alert } from "@mui/material";

type Props = {
  errors: string[];
};

function FormErrors({ errors }: Props) {
  return (
    <Alert
      sx={{
        width: "100%",
        mt: 2,
        "& .MuiAlert-icon": {
          alignItems: "center",
        },
      }}
      variant="filled"
      severity="error"
    >
      <ul>
        {errors.map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    </Alert>
  );
}

export default FormErrors;
