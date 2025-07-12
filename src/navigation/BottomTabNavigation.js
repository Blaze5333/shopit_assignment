import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, accessibilityState, onPress }) => {
  const isSelected = accessibilityState.selected;
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const widthValue = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isSelected ? 1.05 : 1,
        useNativeDriver: false,
        tension: 150,
        friction: 8,
      }),
      Animated.spring(widthValue, {
        toValue: isSelected ? 90 : 50,
        useNativeDriver: false,
        tension: 150,
        friction: 8,
      }),
    ]).start();
  }, [isSelected, scaleValue, widthValue]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.spring(scaleValue, {
        toValue: isSelected ? 1.05 : 1,
        useNativeDriver: false,
        tension: 150,
        friction: 8,
      }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.tabIconContainer,
          isSelected && styles.selectedTabIcon,
          {
            transform: [{ scale: scaleValue }],
            width: widthValue,
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeIcon = ({ color, size, focused }) => (
  <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
    <FeatherIcon 
      name="home" 
      color={focused ? '#FFFFFF' : color} 
      size={size} 
    />
    {focused && <Text style={styles.tabLabel}>Home</Text>}
  </View>
);

const CartIcon = ({ color, size, focused }) => {
  const cartItems = useSelector(state => state.user.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
      <View style={styles.cartIconContainer}>
        <FeatherIcon 
          name="shopping-cart" 
          color={focused ? '#FFFFFF' : color} 
          size={size} 
        />
        {cartCount > 0 && (
          <View style={[styles.cartBadge, focused && styles.cartBadgeActive]}>
            <Text style={styles.cartBadgeText}>
              {cartCount > 99 ? '99+' : cartCount}
            </Text>
          </View>
        )}
      </View>
      {focused && <Text style={styles.tabLabel}>Cart</Text>}
    </View>
  );
};

const renderHomeIcon = ({ color, size, focused }) => (
  <HomeIcon color={color} size={22} focused={focused} />
);

const renderCartIcon = ({ color, size, focused }) => (
  <CartIcon color={color} size={22} focused={focused} />
);

const renderCustomTabButton = (props) => <CustomTabButton {...props} />;

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          backgroundColor: '#FFFFFF',
          borderRadius: 35,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 10,
          borderTopWidth: 0,
          paddingHorizontal: 20,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
          tabBarButton: renderCustomTabButton,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: renderCartIcon,
          tabBarButton: renderCustomTabButton,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabIconContainer: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedTabIcon: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    minWidth: 70,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    textAlign: 'center',
  },
  cartIconContainer: {
    position: 'relative',
    marginRight: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeActive: {
    right: -12,
    top: -6,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
