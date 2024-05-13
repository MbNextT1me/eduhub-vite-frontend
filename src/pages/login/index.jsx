import { useEffect } from "react";
import { TextField, Stack, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sessionModel } from "~/entities/session";
import { PageShell } from "~/shared/ui/PageShell";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = sessionModel.useLogin();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <PageShell>
      <Stack
        gap={2}
        component="form"
        onSubmit={handleSubmit((data) =>
          login.mutate({ ...data, username: data.email }),
        )}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button size="large" type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </PageShell>
  );
};
