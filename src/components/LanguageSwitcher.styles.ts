import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginTop: 8,
    zIndex: 99,
  },
  switchTrigger: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  triggerText: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
  },
  absoluteOverlay: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    zIndex: 99,
  },
  overlayTouchable: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.01)', // 透明遮罩，仅用于点击关闭
  },
  menuContainer: {
    position: 'absolute',
    top: 44, // 按钮高度+间距，需视具体实际微调
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 14,
    minWidth: 120,
    elevation: 7,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 7,
  },
  menuItem: {
    paddingVertical: 13,
    paddingHorizontal: 22,
  },
  menuItemText: {
    fontSize: 16,
    color: '#3d3d3d',
    textAlign: 'center',
  },
});
