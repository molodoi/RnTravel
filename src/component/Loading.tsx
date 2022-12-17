import React from 'react';
import { ActivityIndicator } from 'react-native';
import Background from './Background';

export const Loading = () => {
    return (
        <Background>
            <ActivityIndicator color="#0000ff" size="large" />
        </Background>
    );
};