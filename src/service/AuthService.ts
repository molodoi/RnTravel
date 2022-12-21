import axios from 'axios';

import {FIREBASE_API_KEY, FIREBASE_URL} from '../../env';

export type AuthData = {
    idToken?: string;
    email?: string;
    refreshToken?: string;
    expiresIn?: string;
};

async function authenticate(mode: string, email: string, password: string) {
    const url = `${FIREBASE_URL}${mode}?key=${FIREBASE_API_KEY}`;
    try {
        const response = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const login = async (email: string, password: string) => {
    return await authenticate('signInWithPassword', email, password);
};

const register = async (email: string, password: string) => {
    return await authenticate('signUp', email, password);
};

const resetPassword = async (email: string) => {
    const url = `${FIREBASE_URL}sendOobCode?key=${FIREBASE_API_KEY}`;
    try {
        const response = await axios.post(url, {
            requestType: 'PASSWORD_RESET',
            email: email,
        });
        return response.data?.email;
    } catch (err) {
        console.log(err);
    }
};

export const authService = {
    login,
    register,
    resetPassword,
};
