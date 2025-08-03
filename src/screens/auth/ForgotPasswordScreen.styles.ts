import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backLinkRow: {
    marginBottom: 24,
    alignItems: "flex-start",
  },
  backLink: {
    color: "#2b7cff",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 28,
    color: "#222",
  },
  field: {
    marginBottom: 22,
  },
  input: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#ff9000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ffd699",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  successMsg: {
    color: "#23a368",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 15,
    textAlign: "center",
  },
  errorMsg: {
    color: "#e64545",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 15,
    textAlign: "center",
  },
});
