import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

const Header = ({ title = 'ShopIt', icon }) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* {<View style={styles.titleContainer}>
            <Icon name="shopping-bag" size={24} color="#3B82F6" />
            <Text style={styles.title}>{title}</Text>
          </View>} */}
          <Image
            source={require('../assets/logos/logo.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight || 0 + 16,
      },
    }),
    height:80
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 12,
  },
  icon: {
    width: 90,
    height: 90,
    position: 'absolute',
    top: 10,
    left:20
  },
});

export default Header;
