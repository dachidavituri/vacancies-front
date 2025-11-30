import { httpVacanciesClient } from "..";
import type { LoginDto, LoginResponse, User } from "./index.types";

export const loginUser = async (values: LoginDto): Promise<LoginResponse> => {
  try {
    const response = await httpVacanciesClient.post<LoginResponse>(
      "/auth/login",
      values,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error while logging in", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await httpVacanciesClient.get<User>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("Error while fetching current user", error);
    return null;
  }
};
