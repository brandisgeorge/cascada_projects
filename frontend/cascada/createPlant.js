import React, {useState, useEffect} from "react";
import { StyleSheet, Switch, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';


export function createPlant(){
    const navigation = useNavigation();


    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcontainer}>
            <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={25} color="black" />
            <Text style={{ color:'#275161',fontWeight: 'bold',marginHorizontal: 10,fontSize: 28, fontFamily: 'PlayfairDisplay_400Regular'}}>Create Plant Module</Text>
        </View> 
        <View>
            <Text>Name</Text>
            <TextInput></TextInput>

            <Text>Plants in Area</Text>
            <TextInput></TextInput>

            {/* moisture percent*/}
        </View>
        <View>
            
        </View>

        </SafeAreaView>



    );



}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: `#a8cfb2`,
        flex: 1,
        
    },

    topcontainer:{
        marginTop: 30,
        marginHorizontal: 40,
        flex: .2,
        flexDirection: "row",
  
    },


});