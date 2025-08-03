import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants"; // 确保引入API_URL常量

const USER_KEY = "eatwhat_user";

export type User = {
  username: string;
  // 其他用户信息如 email, token, 等
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化时读取用户
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(USER_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
    })();
  }, []);

  // 登录（调用服务端 API 并保存到 AsyncStorage）
  const login = useCallback(async (username: string, password: string) => {
    // 这里建议真实项目放到 api.ts service 里，这里简单直写
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "登录失败");
    const userData: User = { username: data.username }; // 可扩展
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  // 登出
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // 注册
  const register = useCallback(async (username: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "注册失败");
    // 注册后不自动登录
    return data;
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    register,
    isLoggedIn: !!user,
  };
}
