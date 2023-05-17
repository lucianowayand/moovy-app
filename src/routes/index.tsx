import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login';
import Home from '../pages/home';
import { AuthProvider } from '../context/AuthContext';
import Settings from '../pages/settings';

const Stack = createNativeStackNavigator();

export default function Router(){
    return <NavigationContainer>
        <NavigationProvider />
    </NavigationContainer >
}

function NavigationProvider(){
    const navigation = useNavigation();

    return <>
        <AuthProvider navigation={navigation}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </AuthProvider>
    </>
}