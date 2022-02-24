import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';



export function HomePage(){
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcontainer}>
          <Text>Hello, </Text>
          <Text>Brandis!</Text>
        </View>
        <Text>Check your moisture level for plants</Text>
        <View style={styles.notificationcontainer}>
          <TouchableOpacity style={styles.button}></TouchableOpacity>
          <View style={{flexDirection: "column"}}>
            <Text>Area 2</Text>
            <Text>Area 2 has finished watering</Text>
          </View>
        </View>
          <ScrollView style={styles.sidescroll} horizontal={true}>
            <AreaWidget>
            </AreaWidget>
            <AreaWidget>
            </AreaWidget>
            <AreaWidget>
            </AreaWidget>
          </ScrollView>
        </SafeAreaView>
    );
}

class AreaWidget extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.areaWidget}>

        </TouchableOpacity>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: `#CCFFE5`,
        flex: 1,
        
    },
    topcontainer:{
      marginHorizontal: 40,
      flex: .2,
      marginTop: 10,
      flexDirection: "row",

    },
    notificationcontainer:{
      flex: .5,
      marginHorizontal: 40,
      flexDirection: "row",
    },

    sidescroll: {
      flex: .75,
      flexGrow: 1,
    },
    areaWidget: {      
      height: 305,
      width: 202,
      margin: 12,
      borderRadius: 18,
      backgroundColor: '#5EA671',
      alignItems: "center",
      justifyContent: "center",

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
        height: 70,
        width: 70,
        margin: 12,
        borderRadius: 30,
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