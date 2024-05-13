import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useFiles = ({ taskId, category }) =>
  useQuery({
    queryKey: ["files", taskId, category],
    queryFn: () => api.getFiles({ taskId, category }),
  });

export const useDeleteFile = (category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteFile,
    onSuccess: (_, taskId) =>
      queryClient.invalidateQueries({
        queryKey: ["files", taskId, category],
      }),
  });
};
