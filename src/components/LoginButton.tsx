// src/components/LoginButton.tsx
import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import UserMenu from './UserMenu';
import { getUser } from '../services/auth';
import styles from './LoginButton.styles';

const LoginButton: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [menuVisible, setMenuVisible] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const u = await getUser();
      setUser(u);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (user) {
    return (
      <>
        <TouchableOpacity
          style={styles.userTrigger}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.userText}>{user.username} ▼</Text>
        </TouchableOpacity>
        <UserMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </>
    );
  }

  return (
    <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => navigation.navigate('Login' as never)}
    >
      <Text style={styles.loginBtnText}>{t('login')}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
