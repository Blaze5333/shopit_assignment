import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import ProductDetail from '../screens/ProductDetail';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
