import axios from "axios";
import type {
  RegistrationData,
  VerificationData,
  LoginData,
  UserInfo,
} from "../types";

const API_BASE_URL = "https://staging.creagen.pro";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const authApi = {
  async register(data: RegistrationData) {
    await this.getCsrfCookie();

    const response = await apiClient.post("/api/v1/user/registration", {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  },

  async verify(data: VerificationData, token: string) {
    const response = await apiClient.patch(
      "/api/v1/user/registration/verify",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async getCsrfCookie() {
    return await apiClient.get("/sanctum/csrf-cookie");
  },

  async login(data: LoginData) {
    const response = await apiClient.post("/api/v1/user/login", data);
    return response.data;
  },

  async getUserInfo(): Promise<UserInfo> {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/api/v1/user/basicInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
};
