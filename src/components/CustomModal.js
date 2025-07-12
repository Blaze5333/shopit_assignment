import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomModal = ({ 
  visible, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'confirm'
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'delete':
        return { icon: 'trash-2', color: '#EF4444' };
      case 'warning':
        return { icon: 'alert-triangle', color: '#F59E0B' };
      case 'info':
        return { icon: 'info', color: '#3B82F6' };
      default:
        return { icon: 'help-circle', color: '#6B7280' };
    }
  };

  const iconData = getIconAndColor();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={[styles.iconContainer, { backgroundColor: `${iconData.color}15` }]}>
                <Icon name={iconData.icon} size={32} color={iconData.color} />
              </View>
              
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.confirmButton, { backgroundColor: iconData.color }]}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CustomModal;
