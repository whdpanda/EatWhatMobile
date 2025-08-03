import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styles from "./LoginScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";
import { login } from "../../services/auth";

const USER_KEY = "eatwhat_user";

// 生成验证码
const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++)
    code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

export default function LoginScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // 类型安全 navigation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // 初始加载验证码
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  // 刷新验证码
  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  // 登录处理
  async function handleLogin() {
    Keyboard.dismiss(); // 自动关闭键盘
    setErr("");
    setCaptchaError("");
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setCaptchaError(t("captcha_wrong"));
      handleRefreshCaptcha();
      return;
    }
    setLoading(true);
    try {
      const data = await login(username, password);
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({ username: data.username })
      );
      // 跳转首页并清空历史栈
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (e: any) {
      setErr(e.message || t("login_failed"));
    }
    setLoading(false);
  }

  // 跳转主页
  const handleGoHome = () => navigation.navigate("Home");
  // 跳转注册
  const handleRegister = () => navigation.navigate("Register");
  // 跳转忘记密码
  const handleForgot = () => navigation.navigate("ForgotPassword");

  return (
    <View style={styles.container}>
      {/* 返回主页 */}
      <TouchableOpacity onPress={handleGoHome} style={styles.backLinkRow}>
        <Text style={styles.backLink}>{t("back")}</Text>
      </TouchableOpacity>

      {/* 登录标题 */}
      <Text style={styles.loginTitle}>{t("login_title")}</Text>

      {/* 用户名输入 */}
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder={t("login_username")}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="username"
        />
      </View>
      {/* 密码输入 */}
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder={t("login_password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
        />
      </View>
      {/* 验证码 */}
      <View style={styles.captchaRow}>
        <TextInput
          style={styles.captchaInput}
          placeholder={t("captcha_placeholder")}
          value={captchaInput}
          onChangeText={setCaptchaInput}
          maxLength={4}
        />
        <TouchableOpacity onPress={handleRefreshCaptcha}>
          <Text style={styles.captchaCode} selectable={false}>
            {captcha}
          </Text>
        </TouchableOpacity>
      </View>
      {/* 错误提示 */}
      {!!captchaError && <Text style={styles.errorMsg}>{captchaError}</Text>}
      {!!err && <Text style={styles.errorMsg}>{err}</Text>}
      {/* 登录/注册按钮 */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t("login")}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>
      </View>
      {/* 忘记密码入口 */}
      <TouchableOpacity onPress={handleForgot} style={styles.forgotLink}>
        <Text style={styles.forgotLinkText}>{t("forgot_password")}</Text>
      </TouchableOpacity>
    </View>
  );
}
