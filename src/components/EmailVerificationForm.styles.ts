import { StyleSheet } from "react-native";

export default StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 17,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff9900",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ffc966",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  error: {
    color: "#f33",
    marginTop: 8,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
  success: {
    color: "#38b000",
    marginTop: 8,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
});
