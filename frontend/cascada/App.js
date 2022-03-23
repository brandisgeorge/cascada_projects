import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, PlayfairDisplay_400Regular} from '@expo-google-fonts/playfair-display';
import AppLoading from 'expo-app-loading';
import { LoginScreen } from './LoginScreen';
import { SignupPage } from './SignupPage';
import { HomePage } from './HomePage';
import { createPlant } from './createPlant';
import { plantArea } from './Area';
import 'localstorage-polyfill';

import React from 'react';


const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });
  if (!fontsLoaded){
    return <AppLoading />;
  }
  else {
    return(
      <NavigationContainer>
        <Stack.Navigator   screenOptions={{headerShown: false}}>
          
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupPage} />
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='cPlant' component={createPlant} />
          <Stack.Screen name='Area' component={plantArea} />

        </Stack.Navigator>
      </NavigationContainer>
  );}
}