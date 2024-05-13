import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useTask = (id) =>
  useQuery({ queryKey: ["task", id], queryFn: () => api.getTask(id) });

export const useTasks = () =>
  useQuery({ queryKey: ["tasks"], queryFn: api.getTasks });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};
