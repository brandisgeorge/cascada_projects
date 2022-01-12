import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

function LoginScreen({navigation}){
  return(
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} 
          resizeMode='cover'
          style={styles.backImage}
      >
        <image
          source={require('./assets/cascada.png')}
        />
        <Text>LoginScreen</Text>
        <Button
          title="signup"
          onPress={() => navigation.navigate('Signup')}
        />
      </ImageBackground>
    </View>
  );
}

function SignupPage({navigation}){
  return(
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} 
          resizeMode='cover'
          style={styles.backImage}
      >
        <image
          source={require('./assets/cascada.png')}
        />
        <Text>LoginScreen</Text>
        <Button
          title='go back'
          onPress={() => navigation.navigate('Login')}
        />
      </ImageBackground>
    </View>
  );
}

function HomePage(){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",

  },
  backImage: {
    flex: 1,
    justifyContent: "center",
  },
});
