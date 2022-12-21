import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthData, authService } from '../service/AuthService';

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    login(email: string, password: string): void;
    register(email: string, password: string): void;
    logout(): void;
    resetPassword(email: string): void;
};

// Creation du Auth Context avec le type de data specifié AuthContextData et un objet vide
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = { children: React.ReactNode };

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();

    // le AuthContext démarre à true et reste comme ça, jusqu'à ce que les données soient chargées depuis AsyncStorage
    const [loading, setLoading] = useState(true);

    // Chaque fois que l'application est ouverte, le fournisseur est rendu et appelle la fonction loadStorageData.
    useEffect(() => {
        loadStorageData();
    }, []);

    // Check & Charge les données d'auth stockées sur le device 
    async function loadStorageData(): Promise<void> {
        try {
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                // S'il y a des données, elles sont converties en un objet src/service/AuthService.ts::AuthData et l'état AuthData est mis à jour setAuthData.                
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
            // Gérer les ereurs
        } finally {
            // fin du chargement
            setLoading(false);
        }
    }

    // Connecter l'utilisateur
    const login = async (email: string, password: string) => {
        // Appeler le service en passant les informations d'identification fournies par l'utilisateur via un Form||InputText (e-mail et mot de passe).
        const _authData = await authService.login(email, password); // src/service/AuthService.ts::login 

        // Initialiser les données dans le contexte, afin que l'application puisse envoyer l'utilisateur vers la partie authentifiée de l'application (AuthenticatedStackNavigator) 
        setAuthData(_authData);

        // Conservez les données dans l'Async Storage pour qu'elles soient récupérées lors de la prochaine session utilisateur.
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
    };

    const register = async (email: string, password: string) => {
        
        // Appeler le service en passant les informations d'identification fournies par l'utilisateur via un Form||InputText (e-mail et mot de passe).
        const _authData = await authService.register(email, password); // src/service/AuthService.ts::signIn 

        // Initialiser les données dans le contexte, afin que l'application puisse envoyer l'utilisateur vers la partie authentifiée de l'application (AuthenticatedStackNavigator) 
        setAuthData(_authData);

        // Conservez les données dans l'Async Storage pour qu'elles soient récupérées lors de la prochaine session utilisateur.
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
    };

    // Déconnecter l'utilisateur
    const logout = async () => {
        // Supprimer les données du contexte, afin que l'application puisse renvoyer l'utilisateur vers la partie authentification de l'application (AuthStackNavigator : Screen Login, Register, etc..) 
        setAuthData(undefined);
        // Supprimer les données de l'Async Storage pour qu'elles ne soient PAS récupérées lors de la prochaine session.
        await AsyncStorage.removeItem('@AuthData');
    };

    // Reset Password
    const resetPassword = async (email: string) => {
        const _authData = await authService.resetPassword(email); // src/service/AuthService.ts::resetPassword 
        // Supprimer les données du contexte, afin que l'application puisse renvoyer l'utilisateur vers la partie authentification de l'application (AuthStackNavigator : Screen Login, Register, etc..) 
        setAuthData(undefined);
        // Supprimer les données de l'Async Storage pour qu'elles ne soient PAS récupérées lors de la prochaine session.
        await AsyncStorage.removeItem('@AuthData');
    };

    return (
        // Ce composant sera utilisé pour encapsuler l'ensemble de l'application, de sorte que tous les composants auront accès au contexte
        <AuthContext.Provider value={{ authData, loading, login, logout, register, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

// Un simple Hook pour faciliter l'accès au AuthContext et permettre aux composants de s'abonner aux mises à jour d'AuthContext
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
