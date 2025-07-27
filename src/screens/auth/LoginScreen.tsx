import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styles from "./LoginScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";
import { login } from "../../services/auth";

const USER_KEY = "eatwhat_user";

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  async function handleLogin() {
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
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  } catch (e: any) {
    setErr(e.message || t("login_failed"));
  }
  setLoading(false);
}
  const handleGoHome = () => navigation.navigate("Home" as never);
  const handleRegister = () => navigation.navigate("Register" as never);

  return (
    <View style={styles.container}>
      {/* 返回主页 */}
      <TouchableOpacity onPress={handleGoHome} style={styles.backLinkRow}>
        <Text style={styles.backLink}>{t("back_home")}</Text>
      </TouchableOpacity>

      <Text style={styles.loginTitle}>{t("login_title")}</Text>

      {/* 用户名 */}
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
      {/* 密码 */}
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
          <Text style={styles.captchaCode} selectable={false} >{captcha}</Text>
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
    </View>
  );
}
