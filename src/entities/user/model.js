import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: api.getUsers });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["users"],
      }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["users"],
      }),
  });
};
