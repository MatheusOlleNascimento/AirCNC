import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Image, AsyncStorage, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
export default function List({navigation}){
    const [techs, SetTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.107:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            SetTechs(techsArray);
        })
    }, []);

    async function handleCancel(){
        await AsyncStorage.clear();
        await navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <TouchableOpacity onPress={handleCancel}><Text style={styles.logout}>Sair</Text></TouchableOpacity>
            {techs.map(tech =><SpotList key={tech} tech={tech}/>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 30
    },

    logout: {
        color: '#F05A5B',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10
    }

})
