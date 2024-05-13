import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "~/shared/api";
import { decodeToken } from "~/shared/lib/jwt";
import { getToken, setToken } from "~/shared/lib/browser";
import { queryClient } from "~/shared/lib/react-query";

export const getUserCache = () => queryClient.getQueryData(["user"]);

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getToken();
      if (token) {
        const payload = decodeToken(token);
        return {
          username: payload.sub,
          role: payload.role,
        };
      }
      return null;
    },
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      const payload = decodeToken(data.token);
      queryClient.setQueryData(["user"], {
        username: payload.sub,
        role: payload.role,
      });
      setToken(data.token);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    setToken(null);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
};
