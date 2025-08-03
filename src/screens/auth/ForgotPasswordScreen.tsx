import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styles from "./ForgotPasswordScreen.styles";
import { API_URL } from "../../constants"; // 确保引入API_URL常量
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    setMsg('');
    setErr('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/send-reset-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setMsg(t('reset_link_sent') || '重置密码链接已发送，请查收邮箱。');
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || t('error_send_link') || '发送失败，请重试。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 返回登录 */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.backLinkRow}>
        <Text style={styles.backLink}>{t("back") || "返回登录"}</Text>
      </TouchableOpacity>
      {/* 标题 */}
      <Text style={styles.title}>{t('forgot_password')}</Text>
      {/* 输入邮箱 */}
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {/* 提示信息 */}
      {msg ? <Text style={styles.successMsg}>{msg}</Text> : null}
      {err ? <Text style={styles.errorMsg}>{err}</Text> : null}
      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>{t('reset_password')}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}
