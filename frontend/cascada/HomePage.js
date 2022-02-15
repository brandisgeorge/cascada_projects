import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


export function HomePage(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            
        </View>

    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5EA671',
        
    },
    
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