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
  Checkbox,
} from "@mui/material";
import { useEffect } from "react";
import { clusterModel } from "~/entities/cluster";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  hostName: yup.string().required("Host Name is required"),
  port: yup.string().required("Port is required"),
  hostUserName: yup.string().required("User Name is required"),
  hostUserPassword: yup.string().required("Password is required"),
  usedAsActive: yup.boolean().required("usedAsActive is required"),
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
      hostName: "",
      port: "",
      hostUserName: "",
      hostUserPassword: "",
      usedAsActive: false,
    },
  });
  const createCluster = clusterModel.useCreateCluster();

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
            name="hostName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Host Name"
                variant="outlined"
                fullWidth
                error={!!errors.hostName}
                helperText={errors.hostName?.message}
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
            name="hostUserName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Name"
                variant="outlined"
                fullWidth
                error={!!errors.hostUserName}
                helperText={errors.hostUserName?.message}
              />
            )}
          />
          <Controller
            name="hostUserPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.hostUserPassword}
                helperText={errors.hostUserPassword?.message}
              />
            )}
          />
          <Controller
            name="usedAsActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                label="Is Active"
                color="primary"
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
