import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { taskModel } from "~/entities/task";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  dateFrom: yup.date().required("Start date is required"),
  dateTo: yup
    .date()
    .required("End date is required")
    .min(yup.ref("dateFrom"), "End date must be after start date"),
  description: yup.string().required("Description is required"),
});

export const CreateTaskModal = ({ open, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dateFrom: null,
      dateTo: null,
      description: "",
    },
  });
  const createTask = taskModel.useCreateTask();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Stack
          mt={2}
          gap={2}
          component="form"
          onSubmit={handleSubmit((data) => {
            createTask.mutate(data);
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
            name="dateFrom"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Date From"
                variant="outlined"
                fullWidth
                slotProps={{
                  textField: {
                    error: !!errors.dateFrom,
                    helperText: errors.dateFrom?.message,
                  },
                }}
              />
            )}
          />
          <Controller
            name="dateTo"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Date To"
                fullWidth
                variant="outlined"
                slotProps={{
                  textField: {
                    error: !!errors.dateTo,
                    helperText: errors.dateTo?.message,
                  },
                }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={6}
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
