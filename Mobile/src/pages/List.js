import React, { Component, useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import { SafeAreaView,ScrollView, Image ,StyleSheet, Text, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/spotList';

import logo from '../assets/logo.png';

export default function List () {
    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.1.7:3333',{
                query: {user_id}
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} na data de ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() =>{
        AsyncStorage.getItem('techs').then(storagedTechs =>{
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <Image style = {styles.logo} source={logo}/>
        <ScrollView showsVerticalScrollIndicator={false}>  
        {techs.map(tech => <SpotList key={tech} tech={tech}/> )}
        </ScrollView>
    </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    logo:{
        height: 32,
        resizeMode:'contain',
        alignSelf: 'center',
        marginTop: 10

    }
})
