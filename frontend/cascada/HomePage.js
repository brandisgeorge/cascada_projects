import React, {useState, useEffect} from "react";
import { StyleSheet, Switch, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 



import PropTypes from 'prop-types';
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";



export function HomePage(){ 
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  const [ areaProp, setAreaprop] = useState([]);

  useEffect(() =>{

    const fetchData = async () => {
      const dtoken = await AsyncStorage.getItem('token');    
      
      if (dtoken === null) {
        console.log("going back")
        navigation.navigate('Login');
      } else {
        console.log("token is ",dtoken );
        //fetch('http://192.168.0.155:8000/api/accounts/details', {
        fetch('http://172.24.19.180:8000/api/accounts/details', {
        //fetch('http://10.20.74.19:8000/api/accounts/details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${dtoken}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setUsername(data.username);
            console.log("user name is",data.username);
            setLoading(false);
          });
          fetch('http://172.24.19.180:8000/api/modules/listplant', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${dtoken}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setAreaprop(data);
            console.log("Area name is",data);
            setLoading(false);
          });
      }
      }

    fetchData()

  }, []);


  const areaNav = async () => {
        
    navigation.navigate('Area');

  }; 

/*  const areaProp = [
    {key: '1', arean: 'Area1', areaPic: require('./assets/plant1.png')},
    {key: '2', arean: 'Area2', areaPic: require('./assets/Cactus.png')}
  ] */

  const AreaWidget = () => {
    return areaProp.map((props) => {
       return (
         <View key = {props.id}>
           <TouchableOpacity style={styles.areaWidget} onPress={areaNav}>
             <Image style={styles.areaImage} source={require('./assets/plant1.png')}></Image>
             <Text>{props.name}</Text>
           </TouchableOpacity>
         </View>
       );
   })}

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcontainer}>
          <Text style={styles.userText}>Hello, </Text>
          <Text style={styles.userText2} >{username}!</Text>
        </View>
        <View style={{marginHorizontal: 40, marginBottom: 20}}>
          <Text style={{fontFamily: "PlayfairDisplay_400Regular"}}>System Power</Text>
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
          <TouchableOpacity style={styles.button}><Entypo name="flower" size={24} color="white" /></TouchableOpacity>
          <View style={{flexDirection: "column"}}>
            <Text>Area 2</Text>
            <Text>Area 2 has finished watering</Text>
          </View>
        </View>
          <ScrollView style={styles.sidescroll} horizontal={true}>
            <AreaWidget arean = {areaProp.name}></AreaWidget>
            <TouchableOpacity style={styles.areaWidget}>
             <Image style={styles.areaImage} source={require('./assets/Cactus.png')}></Image>
             <Text>Area2</Text>
           </TouchableOpacity>
          </ScrollView>
          <View style={styles.notificationcontainer2}>             
          <TouchableOpacity style={styles.button2}><Ionicons name="person-circle-outline" size={24} color="white" /></TouchableOpacity>
            <TouchableOpacity style={styles.button3} ><Image style={styles.iconImage} source={require('./assets/cascada.png')}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cPlant')} style={styles.button2}><Entypo name="plus" size={24} color="white" /></TouchableOpacity>
          </View>
        </SafeAreaView>
    );
}





const styles = StyleSheet.create({
    container: {
        backgroundColor: `#a8cfb2`,
        flex: 1,
        
    },

    areaImage: {
      width: 109,
      height: 208,
      resizeMode: 'contain',
    },

    topcontainer:{
      margin: 28,
      marginHorizontal: 40,
      flex: .2,
      flexDirection: "row",

    },


    notificationcontainer:{
      alignItems: 'center',
      marginHorizontal: 40,
      flex: .3,
      flexDirection: "row",
    },

    notificationcontainer2:{
      alignItems: 'center',
      marginHorizontal: 70,
      flex: .3,
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
      width: 70,
      height: 70,
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
        height: 52,
        backgroundColor: '#275161',
        width: 52,
        margin: 12,
        marginHorizontal: 20,
        borderRadius: 14,
        borderColor: '#D1F892',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button3: {
      height: 70,
      width: 70,
      margin: 12,
      marginHorizontal: 20,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
  },
  });

