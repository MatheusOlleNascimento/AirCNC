import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

import api from '../services/api';

export default function Book({navigation}){
    const [date, SetDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: {user_id}
        })

        Alert.alert('Solicitação de reserva enviada!');
        
        navigation.navigate('List');
    }
    
    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={SetDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reservar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
    },
    
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
       height: 44,
       marginBottom: 20,
       borderRadius: 2     
   },

   button: {
       height: 42,
       backgroundColor: '#F05A5B',
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 2,

   },

   cancelButton: {
        marginTop: 10,
        backgroundColor: '#CCC',
    },

   buttonText: {
       color: '#FFF',
       fontWeight: 'bold',
       fontSize: 16,
   }
})
