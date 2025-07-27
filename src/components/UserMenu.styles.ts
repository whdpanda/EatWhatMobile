import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menuContainer: {
    position: 'absolute',
    top: 72,      // 根据你的按钮高度适当调整
    right: 16,    // 和按钮对齐的右边距
    backgroundColor: '#fff',
    borderRadius: 18,
    minWidth: 120,
    elevation: 7,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    zIndex: 99,
  },
  menuItem: {
    paddingVertical: 13,
    paddingHorizontal: 32,
  },
  menuItemText: {
    fontSize: 18,
    color: '#f33',
    textAlign: 'center',
  },
});
