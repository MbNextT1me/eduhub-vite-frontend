import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/shared/api";

export const useTaskFiles = ({ taskId, category }) =>
  useQuery({
    queryKey: ["files", taskId],
    queryFn: () => api.getTaskFiles({ taskId, category }),
  });

export const useTaskFilesByEmail = ({ taskId, email }) =>
  useQuery({
    queryKey: ["files", taskId, email],
    queryFn: () => api.getTaskFilesByEmail({ taskId, email }),
  });

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, fileId }) => api.deleteFile(taskId, fileId),
    onSuccess: (data, variables) =>
      queryClient.invalidateQueries({
        queryKey: ["files", variables.taskId],
      }),
  });
};

export const useAddFile = ({ taskId, category }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("taskId", taskId);
      formData.append("file", file, file.name);
      formData.append("category", category);
      await api.addFile(formData);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["files", taskId],
      }),
  });
};

export const useDownloadFile = () =>
  useMutation({
    mutationFn: async ({ output, fileId }) => {
      const content = await api.downloadFile(fileId);
      const blob = new Blob([content], { type: "application/octet-stream" });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = output;
      link.click();
      URL.revokeObjectURL(blobUrl);
    },
  });

export const useSendFileToCluster = ({ taskId, email }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("taskId", taskId);
      formData.append("file", file, file.name);
      await api.sendFileToCluster(formData);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["files", taskId, email],
      }),
  });
};
