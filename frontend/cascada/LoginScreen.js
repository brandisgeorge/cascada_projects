import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';


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
      fetch('http://127.0.0.1:8000/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            localStorage.clear();
            localStorage.setItem('token', data.token);
            navigation.navigate('Home');
          } else {
            localStorage.clear();
            console.log(data.response)
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

        <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 24, color: "#D1F892", 
            fontFamily: 'PlayfairDisplay_400Regular'}}
            onPress={login}>LOGIN</Text>

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
  