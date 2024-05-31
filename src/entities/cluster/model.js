import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useClusters = () =>
  useQuery({ queryKey: ["clusters"], queryFn: api.getClusters });

export const useCreateCluster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createCluster,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["clusters"],
      }),
  });
};

export const useDeleteCluster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteCluster,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["clusters"],
      }),
  });
};
