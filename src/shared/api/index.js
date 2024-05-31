import axios from "axios";
import { getToken } from "~/shared/lib/browser";
import { API_URL } from "~/shared/config/env";

class Api {
  constructor(options) {
    this.axiosInstance = axios.create(options);
  }

  sendFileToCluster = (formData) =>
    this.privateRequest({
      url: "clusters/remoteExecution",
      method: "POST",
      data: formData,
    });

  downloadFile = (fileId) =>
    this.privateRequest({
      url: `files/${fileId}`,
      method: "GET",
      responseType: "arraybuffer",
    });

  getTaskFilesByEmail = ({ taskId, email }) =>
    this.privateRequest({
      url: `tasks/${taskId}/users/${email}`,
      method: "GET",
    });

  getStudents = () =>
    this.privateRequest({
      url: "users/ROLE_STUDENT",
      method: "GET",
    });

  addFile = (formData) =>
    this.privateRequest({
      url: "tasks/files",
      method: "POST",
      data: formData,
    });

  deleteFile = (taskId, fileId) =>
    this.privateRequest({
      url: `tasks/${taskId}/files/${fileId}`,
      method: "DELETE",
    });

  getTask = (taskId) =>
    this.privateRequest({
      url: `tasks/${taskId}`,
      method: "GET",
    });

  getTaskFiles = ({ taskId, category }) =>
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

  deleteTask = (taskId) =>
    this.privateRequest({
      url: `tasks/${taskId}`,
      method: "DELETE",
    });

  getClusters = () =>
    this.privateRequest({
    url: "clusters",
    method: "GET",
  });
  
  createCluster = (data) =>
    this.privateRequest({
    url: "clusters",
    method: "POST",
    data,
  });
  
  deleteCluster = (clusterId) =>
    this.privateRequest({
    url: `clusters/${clusterId}`,
    method: "DELETE",
  });

  createUser = (data) =>
    this.privateRequest({
      url: "registration",
      method: "POST",
      data,
    });

  deleteUser = (taskId) =>
    this.privateRequest({
      url: `users/${taskId}`,
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
