import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/auth/LoginScreen';
import RegisterScreen from '../screen/auth/RegisterScreen';
import ForgetPasswordScreen from '../screen/auth/ForgetPasswordScreen';

type AuthNavigatorProps = {
    Login: undefined;
    Register: undefined;
    ForgetPassword: undefined;
};

const AuthNavigator = createStackNavigator<AuthNavigatorProps>();

const AuthStackNavigator = () => {
    return (
        <AuthNavigator.Navigator initialRouteName="Login" screenOptions={{ headerMode: 'float', headerShown: true }} >
            <AuthNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <AuthNavigator.Screen name="Register" component={RegisterScreen} />
            <AuthNavigator.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        </AuthNavigator.Navigator>
    )
}

export default AuthStackNavigator