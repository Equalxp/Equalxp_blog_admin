import { http } from "@/utils/http";

export type UserResult = {
  code: number;
  message: String;
  result: {
    token: string; // token
    username: string; // 用户名
    role: number; // 用户角色
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/api/user/login", { data });
};
