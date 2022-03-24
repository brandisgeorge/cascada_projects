import React, {useState, useEffect} from "react";
import { StyleSheet,Switch, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedProgressWheel from 'react-native-progress-wheel';


export function plantArea(){
    const navigation  = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <SafeAreaView style={styles.container}>
            <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={25} color="black" />
            <View style={styles.headercontainer}>
                <Text style={styles.header}>Area 1</Text>
                <Text>Details of Area 1</Text>

            </View>
            
            <View style={styles.rowcontainer}>
                <TouchableOpacity style={styles.button2}><FontAwesome name="percent" size={24} color="white" /></TouchableOpacity>
                <TouchableOpacity style={styles.button2}><Feather name="sun" size={24} color="white" /></TouchableOpacity>
                <TouchableOpacity style={styles.button2}><MaterialCommunityIcons name="flower-tulip-outline" size={24} color="white" /></TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems: "center"}}>
                <AnimatedProgressWheel 
                    size={290} 
                    width={40} 
                    color={'#D1F892'}
                    progress={20}
                    backgroundColor={'#5EA671'}
                    
                />
            </View>
            <View style={styles.rowcontainer}>
                <View style={{flex: 1,}}>
                    <Text style={styles.commonText}>Ideal Percentage</Text>
                    <Text style={styles.commonText}>50%</Text>
                </View>
                <View style={{flex: 1,}}>
                    <Text style={styles.commonText}>Turn On/Off</Text>
                    <Switch
        trackColor={"#D1F892"}
        thumbColor={"#D1F892"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
                </View>
            </View>
            <View style={{flex: .3, alignItems: "center"}}>
                <TouchableOpacity style={styles.bigButton}>
                    <Text style={{fontSize: 18,}}>Set Ideal Water Percentage</Text>
                </TouchableOpacity>
            </View>
                
    



        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: `#a8cfb2`,
        flex: 1,
        
    },
    headercontainer: {
        marginHorizontal: 40,
        
    },

    header: {
        fontFamily: "PlayfairDisplay_400Regular",
        fontSize: 28,
    },

    commonText: {
        fontFamily: "PlayfairDisplay_400Regular",
        fontSize: 15,
    },

    rowcontainer:{
        marginTop: 30,
        marginHorizontal: 40,
        flex: .2,
        flexDirection: "row",
  
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

    bigButton: {
        width: 332,
        height: 67,
        borderRadius: 16,
        backgroundColor: "#5EA671",
        alignItems: "center",
        justifyContent: "center",
    },


});