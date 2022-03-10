import React, {useState, useEffect} from "react";
import { StyleSheet, Switch, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';



export function HomePage(){
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigation.navigate('Login');
    } else {
      fetch('http://127.0.0.1:8000/api/accounts/details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
          setLoading(false);
        });
    }
  }, []);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcontainer}>
          <Text style={styles.userText}>Hello, </Text>
          <Text style={styles.userText2} >{username}!</Text>
        </View>
        <View style={{marginHorizontal: 40, marginBottom: 20}}>
          <Text style={{fontFamily: ""}}>System Power</Text>
          <Switch
        trackColor={"#D1F892"}
        thumbColor={"#D1F892"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        <Text>Check your moisture level for plants</Text>
        </View>
        
        <View style={styles.notificationcontainer}>
          <TouchableOpacity style={styles.button}></TouchableOpacity>
          <View style={{flexDirection: "column"}}>
            <Text>Area 2</Text>
            <Text>Area 2 has finished watering</Text>
          </View>
        </View>
          <ScrollView style={styles.sidescroll} horizontal={true}>
            <AreaWidget  areaNum = {area1} >
            </AreaWidget>
            <AreaWidget>
            </AreaWidget>
          </ScrollView>
        </SafeAreaView>
    );
}

class AreaWidget extends React.Component {
  constructor(areaNum) {
    areaNum = {
    area1: 'Area 1',
    area2: 'Area 1'
  }
  }
  
  render() {

    return (
      <View>
        <TouchableOpacity style={styles.areaWidget}>
          <Image source={require('./assets/plant1.png')}></Image>
          <Text>{areaNum}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: `#a8cfb2`,
        flex: 1,
        
    },
    topcontainer:{
      margin: 28,
      marginHorizontal: 40,
      flex: .2,
      flexDirection: "row",

    },
    notificationcontainer:{
      flex: .5,
      marginHorizontal: 40,
      flexDirection: "row",
    },

    userText:{
      color: "#8ea690",
      fontSize: 28,
      fontFamily: "PlayfairDisplay_400Regular"
    },
    userText2:{
      color: "#275161",
      fontSize: 28,
      fontFamily: "PlayfairDisplay_400Regular"
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