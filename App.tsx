import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme'
import { Router } from './src/navigation/Router';
import { AuthProvider } from './src/context/Auth';

const App = () => {
    return (
        <AuthProvider>
            <PaperProvider theme={theme}>
                <Router />
            </PaperProvider>
        </AuthProvider>
    );
};

export default App;