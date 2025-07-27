import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.styles';

const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchTrigger}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{currentLang.label} ▼</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.absoluteOverlay} pointerEvents="box-none">
          <Pressable
            style={styles.overlayTouchable}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.menuContainer}>
            {LANGUAGES.filter(lang => lang.code !== currentLang.code).map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={styles.menuItem}
                onPress={() => {
                  i18n.changeLanguage(lang.code);
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuItemText}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
