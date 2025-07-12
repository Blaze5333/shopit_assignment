import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const EmptyState = ({ message = 'No products found', subMessage = 'Try adjusting your search terms' }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={48} color="#9CA3AF" />
      <Text style={styles.emptyTitle}>{message}</Text>
      <Text style={styles.emptyMessage}>{subMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyState;
