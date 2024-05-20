import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { ROLES } from "~/shared/config/roles";
import { userModel } from "~/entities/user";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup.string().required("Email is required").email("Invalid email"),
  role: yup.string().required("Role is required"),
});

export const CreateUserModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
      email: "",
      role: "",
    },
  });
  const createUser = userModel.useCreateUser();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create user</DialogTitle>
      <DialogContent>
        <Stack
          mt={2}
          gap={2}
          component="form"
          onSubmit={handleSubmit((data) => {
            createUser.mutate(data);
            onClose();
          })}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Surname"
                variant="outlined"
                fullWidth
                error={!!errors.surname}
                helperText={errors.surname?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select {...field} label="Role" variant="outlined">
                  <MenuItem value={ROLES.admin}>Admin</MenuItem>
                  <MenuItem value={ROLES.student}>Student</MenuItem>
                  <MenuItem value={ROLES.teacher}>Teacher</MenuItem>
                </Select>
                <FormHelperText>{errors.role?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
