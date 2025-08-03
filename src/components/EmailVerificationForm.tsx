import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import styles from "./EmailVerificationForm.styles";
import { verifyEmail } from "../services/auth"; 
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/types";

type Props = {
  defaultEmail?: string;      // 预填邮箱
  onSuccess?: () => void;     // 验证成功后的回调
};

export default function EmailVerificationForm({
  defaultEmail = "",
  onSuccess,
}: Props) {
  const { t } = useTranslation();
  // 👇 关键：指定 navigation 类型！
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !code) {
      setError(t("verify.enter_email_and_code"));
      return;
    }
    if (!isValidEmail(email)) {
      setError(t("register.invalid_email"));
      return;
    }

    setLoading(true);
    try {
      await verifyEmail(email, code);
      setSuccess(t("verify.success"));
      setDisabled(true);
      // 回调或自动跳转
      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => navigation.navigate("Login"), 2600);
      }
    } catch (e: any) {
      setError(e.message || t("verify.failed"));
    }
    setLoading(false);
  };

  // 你可以实现 resend 验证码（如需后端支持）

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={t("email")}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!defaultEmail}
        autoFocus={!defaultEmail}
      />
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder={t("verify_input_code")}
        maxLength={6}
        keyboardType="numeric"
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.button, (loading || disabled) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading || disabled}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>{t("verify_submit")}</Text>
        }
      </TouchableOpacity>
      {/* 如需加 resend 按钮可以加在这里 */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? (
        <Text style={styles.success}>
          {success + "\n" + t("verify.success_to_login")}
        </Text>
      ) : null}
    </View>
  );
}
