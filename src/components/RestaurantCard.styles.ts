import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  info: {
    color: '#555',
    fontSize: 15,
    marginBottom: 2,
  },
  link: {
    color: '#007bff',
    fontSize: 15,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
