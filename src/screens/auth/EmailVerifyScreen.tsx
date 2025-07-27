import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRoute, RouteProp } from "@react-navigation/native";
import EmailVerificationForm from "../../components/EmailVerificationForm";
import styles from "./EmailVerifyScreen.styles";
import type { RootStackParamList } from "../../navigation/types";

type RouteProps = RouteProp<RootStackParamList, "EmailVerify">;

export default function EmailVerifyScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProps>();
  const defaultEmail = route.params?.email || "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("verify_email_title")}</Text>
      <EmailVerificationForm defaultEmail={defaultEmail} />
    </View>
  );
}
