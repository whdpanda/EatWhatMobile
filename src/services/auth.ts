import { apiFetch } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = "https://api.randomeatwhat.com";
const USER_KEY = 'eatwhat_user';  // 统一用这个key！

export async function getUser() {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  } catch (e) {
    return null;
  }
}

// 登录
export function login(username: string, password: string) {
  return apiFetch<{ username: string; token?: string }>(
    `${API_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }
  );
}

// 注册
export function register(username: string, email: string, password: string) {
  return apiFetch<{ username: string; email: string }>(
    `${API_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }
  );
}

// 邮箱验证码验证
export function verifyEmail(email: string, code: string) {
  return apiFetch<{ success: boolean }>(
    `${API_URL}/api/verify-email`,
    {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }
  );
}

// 退出登录（登出）
export async function logout() {
  await AsyncStorage.removeItem(USER_KEY);
}
