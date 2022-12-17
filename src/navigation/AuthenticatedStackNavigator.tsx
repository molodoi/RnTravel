import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

import { useAuth } from '../context/Auth';
import Background from '../component/Background';

import MyLogoSvg from '../assets/logo.svg';
import Header from '../component/Header';

const AuthenticatedStackNavigator = () => {
    const auth = useAuth();
    const logout = () => {
        auth.logout();
    };
    return (
        <Background>
            <Text>Welcome to</Text>
            <MyLogoSvg width={200} height={50} />
            <Header>Discover all</Header>
            <Button mode="contained" onPress={logout}>Logout!</Button>
        </Background>
    )
}

export default AuthenticatedStackNavigator

const styles = StyleSheet.create({})