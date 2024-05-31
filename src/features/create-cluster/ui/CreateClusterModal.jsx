import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useCreateCluster } from "~/entities/cluster";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  host_name: yup.string().required("Host Name is required"),
  port: yup.string().required("Port is required"),
  host_user_name: yup.string().required("User Name is required"),
  host_user_password: yup.string().required("Password is required"),
});

export const CreateClusterModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      host_name: "",
      port: "",
      host_user_name: "",
      host_user_password: "",
    },
  });
  const createCluster = useCreateCluster();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create Cluster</DialogTitle>
      <DialogContent>
        <Stack
          mt={2}
          gap={2}
          component="form"
          onSubmit={handleSubmit((data) => {
            createCluster.mutate(data);
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
            name="host_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Host Name"
                variant="outlined"
                fullWidth
                error={!!errors.host_name}
                helperText={errors.host_name?.message}
              />
            )}
          />
          <Controller
            name="port"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Port"
                variant="outlined"
                fullWidth
                error={!!errors.port}
                helperText={errors.port?.message}
              />
            )}
          />
          <Controller
            name="host_user_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Name"
                variant="outlined"
                fullWidth
                error={!!errors.host_user_name}
                helperText={errors.host_user_name?.message}
              />
            )}
          />
          <Controller
            name="host_user_password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.host_user_password}
                helperText={errors.host_user_password?.message}
              />
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
