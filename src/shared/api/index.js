import axios from "axios";
import { getToken } from "~/shared/lib/browser";
import { API_URL } from "~/shared/config/env";

class Api {
  constructor(options) {
    this.axiosInstance = axios.create(options);
  }

  deleteFile = (id) =>
    this.privateRequest({
      url: `files/${id}`,
      method: "DELETE",
    });

  getTask = (id) =>
    this.privateRequest({
      url: `tasks/${id}`,
      method: "GET",
    });

  getFiles = ({ taskId, category }) =>
    this.privateRequest({
      url: `tasks/${taskId}/files/${category}`,
      method: "GET",
    });

  createTask = (data) =>
    this.privateRequest({
      url: "tasks",
      method: "POST",
      data,
    });

  getTasks = () =>
    this.privateRequest({
      url: "tasks",
      method: "GET",
    });

  deleteTask = (id) =>
    this.privateRequest({
      url: `tasks/${id}`,
      method: "DELETE",
    });

  createUser = (data) =>
    this.privateRequest({
      url: "registration",
      method: "POST",
      data,
    });

  deleteUser = (id) =>
    this.privateRequest({
      url: `users/${id}`,
      method: "DELETE",
    });

  getUsers = () =>
    this.privateRequest({
      url: "users",
      method: "GET",
    });

  login = (data) =>
    this.publicRequest({
      url: "auth",
      method: "POST",
      data,
    });

  publicRequest = async (options) => {
    const response = await this.axiosInstance(options);
    return response.data;
  };

  privateRequest = async (options) => {
    const response = await this.axiosInstance({
      ...options,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...options?.headers,
      },
    });
    return response.data;
  };
}

export const api = new Api({
  baseURL: API_URL,
  withCredentials: true,
});
