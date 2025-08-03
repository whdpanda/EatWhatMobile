import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native'; // 获取token参数
import styles from './PasswordResetForm.styles';
import { API_URL } from '../constants'; // 确保引入API_URL常量

interface Props {
  onSuccess?: () => void;
}

const PasswordResetForm: React.FC<Props> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  // 假设路由传参 ResetPassword: { token: string }
  const token = route.params?.token;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr('');
    setMsg('');
    if (!password || !confirm) {
      setErr(t('register_required') || 'Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setErr(t('register_password_repeat') || 'Passwords do not match');
      return;
    }
    if (!token) {
      setErr(t('reset_link_invalid') || '重置链接无效或已过期，请重新申请。');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reset-password-by-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setMsg(t('reset_password_success') || 'Password reset successful. Please login.');
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || t('reset_password_fail') || 'Reset failed');
      }
    } catch (e) {
      setErr(t('reset_password_fail') || 'Reset failed');
    }
    setLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder={t('new_password')}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder={t('confirm_password')}
        value={confirm}
        onChangeText={setConfirm}
        autoCapitalize="none"
      />
      {err ? <Text style={styles.errorMsg}>{err}</Text> : null}
      {msg ? <Text style={styles.successMsg}>{msg}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('reset_password')}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default PasswordResetForm;
