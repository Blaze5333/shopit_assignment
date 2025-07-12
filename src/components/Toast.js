import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Toast = ({ visible, message, type = 'success', onHide }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible, slideAnim, onHide]);

  if (!visible) return null;

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10B981',
          icon: 'check-circle',
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          icon: 'x-circle',
        };
      case 'info':
        return {
          backgroundColor: '#3B82F6',
          icon: 'info',
        };
      default:
        return {
          backgroundColor: '#10B981',
          icon: 'check-circle',
        };
    }
  };

  const toastStyle = getToastStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: toastStyle.backgroundColor },
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Icon name={toastStyle.icon} size={20} color="#FFFFFF" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
});

export default Toast;
