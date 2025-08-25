import http from "@/utils/http";

// 定义用户相关数据类型
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  roles: string[];
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

/**
 * 用户登录
 * @param params 登录参数
 * @returns 登录结果
 */
export const login = (params: LoginParams): Promise<LoginResult> => {
  return http.post<LoginResult>("/auth/login", params);
};

/**
 * 用户登出
 * @returns 登出结果
 */
export const logout = (): Promise<{ success: boolean }> => {
  return http.post<{ success: boolean }>("/auth/logout");
};

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export const getUserInfo = (): Promise<UserInfo> => {
  return http.get<UserInfo>("/user/info");
};

/**
 * 更新用户信息
 * @param data 用户信息
 * @returns 更新结果
 */
export const updateUserInfo = (data: Partial<UserInfo>): Promise<UserInfo> => {
  return http.put<UserInfo>("/user/info", data);
};

/**
 * 更改密码
 * @param params 密码参数
 * @returns 更改结果
 */
export const changePassword = (params: {
  oldPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> => {
  return http.post<{ success: boolean }>("/user/change-password", params);
};
