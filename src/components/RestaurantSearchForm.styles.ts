import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  form: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: '#333',
    width: 75,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  picker: {
    minWidth: 120,
    color: '#222', // 确保字体色深
    backgroundColor: '#fff', // 保证白底
  },
  button: {
    marginTop: 4,
    backgroundColor: '#ff9900',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
