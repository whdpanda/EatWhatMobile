import React from 'react';
import { View } from 'react-native';
import LanguageSwitcher from './LanguageSwitcher';
import LoginButton from './LoginButton';
import styles from './Header.styles'; // 引入样式

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <LanguageSwitcher />
      <LoginButton />
    </View>
  );
};

export default Header;
