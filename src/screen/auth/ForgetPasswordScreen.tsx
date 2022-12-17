import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Background from '../../component/Background';
import Header from '../../component/Header';
import Button from '../../component/Button';
import TextInput from '../../component/TextInput';
import MyLogoSvg from '../../assets/logo.svg';
import { theme } from '../../core/theme';
import { Navigation } from '../../type/types';
import { emailValidator } from '../../core/utils';

type Props = {
    navigation: Navigation;
};

const ForgetPasswordScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const send = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        // Appeler le service d'envoie d'émail
        navigation.navigate('Login');
    };
    return (
        <Background>
            <MyLogoSvg width={200} height={50} />
            <Header>Restore Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <Button mode="contained" onPress={send} style={styles.button}>
                Send Reset Instructions
            </Button>
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.label}>← Back to login</Text>
            </TouchableOpacity>
        </Background>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
})