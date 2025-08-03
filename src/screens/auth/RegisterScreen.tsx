import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styles from "./RegisterScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";
import { register } from "../../services/auth";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");         
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    setError("");

    if (!username || !email || !password) {
      setError(t("register.enter_username_email_password"));
      return;
    }
    if (!isValidEmail(email)) {
      setError(t("register.invalid_email"));
      return;
    }
    if (password.length < 6) {
      setError(t("register.password_length"));
      return;
    }
    if (password !== password2) {
      setError(t("register.password_mismatch"));
      return;
    }

   setLoading(true);
  try {
    await register(username, email, password);
    navigation.navigate('EmailVerify', { email });
  } catch (e: any) {
    setError(e.message || t("register.failed"));
  }
  setLoading(false);
  };

  // 这里直接传 "Login"，不用 as never
  const handleGoLogin = () => navigation.navigate("Login");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("register_title")}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t("register_username")}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoFocus
        />
        <TextInput
          style={styles.input}
          placeholder={t("email")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder={t("register_password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder={t("register_password_repeat")}
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t("register_submit")}</Text>}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.linkRow}>
        <Text style={styles.linkTip}>{t("register_has_account")}</Text>
        <TouchableOpacity onPress={handleGoLogin}>
          <Text style={styles.link}>{t("register_to_login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
