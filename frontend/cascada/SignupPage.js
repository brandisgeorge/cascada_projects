import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function SignupPage(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

  
    

  let onSubmit = () => {
    const user = {
      email: email,
      username: username,
      password: password,
      password2: password2
    };
     console.log(user)
      fetch('http://192.168.0.155:8000/api/accounts/register',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(async(data) => {
        if (data.token) {
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          console.log('did work data is', data)
          await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
          await AsyncStorage.setItem('token', data.token);
          await sleep(1000);
          navigation.navigate('Home');
        } else {
          console.log("didnt work data is", data)
          AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
        }
      });
    };

    return(
        <ImageBackground source={require('./assets/background.png')} 
            resizeMode='cover'
            style={styles.backImage}
        >
      <View style={styles.imageView}>
        <Image
          source={require('./assets/cascada.png')}
          style={styles.iconImage}
        />
      </View>

      <View style = {styles.innnerView}>
        <Text style={{ margin: 12, fontSize: 40, color: '#275161', fontFamily: 'PlayfairDisplay_400Regular', }} > Get Started </Text>
        
        <TextInput
          style={styles.TextInput}
          onChangeText={ (email) => setEmail(email)}
          placeholder='Email'
        />

        <TextInput
          style={styles.TextInput}
          onChangeText={ (username) => setUsername(username)}
          placeholder='Username'
        />
        
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          value = {password}
          onChangeText={ (password) => setPassword(password)}
          placeholder='Password'
          />

        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          onChangeText={ (password2) => setPassword2(password2)}
          placeholder='retype Password'
          />

        <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 24, color: "#D1F892", fontFamily: 'PlayfairDisplay_400Regular',}}
            onPress={onSubmit}
            >Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 18, fontWeight: "700", color: '#275161', fontFamily: 'PlayfairDisplay_400Regular',}}>Already Have An Account</Text>
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
      fontSize: 20,
      borderWidth: 1,
      height: 74,
      width: 342,
      margin: 5,
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
  