import 'react-native-gesture-handler';          // <-- MUST be first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WordleScreen from './src/screens/WordleScreen';

export type RootStackParamList = {
  Home: undefined;
  Wordle: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"   component={HomeScreen}   />
        <Stack.Screen name="Wordle" component={WordleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
