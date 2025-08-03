import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import PasswordResetForm from "../../components/PasswordResetForm";
import styles from "./ResetPasswordScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSuccess = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("reset_password")}</Text>
      <PasswordResetForm onSuccess={handleSuccess} />
    </View>
  );
}
