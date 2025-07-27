// src/components/UserMenu.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { logout } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './UserMenu.styles';
import type { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface UserMenuProps {
  visible: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>退出</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default UserMenu;
