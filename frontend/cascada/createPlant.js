import React, {useState, useEffect} from "react";
import { StyleSheet, Switch, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function createPlant(){
    const navigation = useNavigation();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    const [name, setName] = useState('');
    const [plants, setPlants] = useState('');

    const addArea = async() => {
        
        const dtoken = await AsyncStorage.getItem('token');

        const nplant = {
            name: name,
            plants: plants,
            valve: isEnabled
        };
        console.log('pre data is', nplant);
        
        fetch('http://192.168.0.155:8000/api/modules/createplant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${dtoken}`
            },
            body: JSON.stringify(nplant)
          })
          .then(response => response.json())
          .then(data => {
            console.log('data is', data);
            navigation.navigate('Area');
        });

    };

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcontainer}>
            <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={25} color="black" />
            <Text style={{ color:'#275161',fontWeight: 'bold',marginHorizontal: 10,fontSize: 28, fontFamily: 'PlayfairDisplay_400Regular'}}>Create Plant Module</Text>
        </View> 
        <View style={{flex: 1,}}>
            <Text >Name</Text>
            <TextInput 
                style={styles.TextInput}
                onChangeText={ (name) => setName(name)}
            ></TextInput>

            <Text>Plants in Area</Text>
            <TextInput 
                style={styles.TextInput2} 
                multiline={true}
                onChangeText={ (plants) => setPlants(plants)}    
            ></TextInput>

            {/* moisture percent*/}
        </View>
        <View  style={{flex: .5,}}>
            <Text>Valve On/Off</Text>
            <Switch
            trackColor={"#D1F892"}
            thumbColor={"#D1F892"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
        </View>
        <TouchableOpacity onPress={addArea} style={styles.addButton}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>

        </SafeAreaView>



    );



}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: `#a8cfb2`,
        flex: 1,
        alignItems: 'center'
        
    },

    topcontainer:{
        marginTop: 30,
        marginHorizontal: 40,
        flex: .2,
        flexDirection: "row",
  
    },
    TextInput: {
        padding: 10,
        borderWidth: 1,
        fontSize: 20,
        height: 45,
        width: 340,
        margin: 12,
        borderRadius: 10,
        borderColor: '#D1F892',
        backgroundColor: '#DDF6B3',
        opacity: 50,
      },
      TextInput2: {
        textAlignVertical: "top",
        padding: 10,
        borderWidth: 1,
        fontSize: 20,
        height: 210,
        width: 340,
        margin: 12,
        borderRadius: 14,
        borderColor: '#D1F892',
        backgroundColor: '#DDF6B3',
        opacity: 50,
      },

      addButton: {
          width: 60,
          height: 60,
          borderRadius: 60,
          borderColor: '#5EA671',
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#DDF6B3',
      }


});