import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{
          headerShown:false
         }}>
             <Stack.Screen name='Home' component={HomeScreen}/>
             <Stack.Screen name='settings' component={SettingsScreen}/>
         </Stack.Navigator>
    </NavigationContainer>
  )
}