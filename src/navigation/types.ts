export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EmailVerify: { email: string } | undefined;
  ResetPassword: { token: string };
  RestaurantList: undefined;
};
