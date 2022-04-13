import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent';


export function LoginScreen(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);


    const login = () => {
  
      const user = {
        email: email,
        password: password
      };
      console.log(user)
      //fetch('http://192.168.0.155:8000/api/accounts/login', {
      fetch('http://172.24.19.180:8000/api/accounts/login', {
      //fetch('http://127.0.0.1:8000/api/accounts/login', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then( async(data) => {
          if (data.token) {
            function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }
            console.log(data.token);
            console.log(data.response);
            await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
            await AsyncStorage.setItem('token', data.token);
            console.log("Token before is", await AsyncStorage.getItem("token"));
            await sleep(1000)
            navigation.navigate('Home');
          } else {
            AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
            console.log("Wrong email/password")
          }
        });
    };
  



  return(
    <ImageBackground source={require('./assets/background.png')} 
        style={styles.backImage}
    >
      <View style={styles.imageView}>
        <Image
          source={require('./assets/cascada.png')}
          style={styles.iconImage}
        />
      </View>
      <View style = {styles.innnerView}>
        <Text style={{ margin: 40, fontSize: 40, color: '#275161', fontFamily: 'PlayfairDisplay_400Regular', }} > Welcome </Text>
        
        <TextInput
          style={styles.TextInput}
          onChangeText={(email) => setEmail(email)}
          placeholder='Email'
        />
        
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholder='Password'
          />

        <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={{fontSize: 24, color: "#D1F892", 
            fontFamily: 'PlayfairDisplay_400Regular'}}
            >LOGIN</Text>

        </TouchableOpacity>

        <TouchableOpacity>
            <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Signup')}>
            <Text style={{fontSize: 18, fontWeight: "700", color: '#275161', fontFamily: 'PlayfairDisplay_400Regular',}}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
    iconImage: {
      top: 50,
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    imageView: {
      alignItems: 'center',
      top: 0,
      flex: 1.2,
    },
    innnerView: {
      alignItems: 'center',
      top: 0,
      flex: 3, 
      backgroundColor: "#6FB699",  
      opacity: .7, 
      borderWidth: 5,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      
    },
    backImage: {
      flex: 1,
      resizeMode: 'cover',
      },
  
    TextInput: {
      padding: 10,
      borderWidth: 1,
      fontSize: 20,
      height: 74,
      width: 342,
      margin: 12,
      borderRadius: 14,
      borderColor: '#D1F892',
      backgroundColor: '#DDF6B3',
      opacity: 50,
    },
  
    button: {
        height: 74,
        width: 342,
        margin: 12,
        borderRadius: 14,
        backgroundColor: '#275161',
        alignItems: "center",
        justifyContent: "center",
    },
    button2: {
        height: 74,
        width: 342,
        margin: 12,
        borderRadius: 14,
        borderColor: '#D1F892',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
  });
  