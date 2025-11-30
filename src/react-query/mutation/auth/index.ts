import { loginUser } from "@/api/auth/auth";
import type { LoginDto, LoginResponse } from "@/api/auth/index.types";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";

export const useLogin = (): UseMutationResult<
  LoginResponse,
  any,
  LoginDto,
  unknown
> => {
  return useMutation<LoginResponse, any, LoginDto>({
    mutationFn: loginUser,
  });
};
