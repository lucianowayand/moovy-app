import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login';
import Home from '../pages/home';

const Stack = createNativeStackNavigator();

const Router = () => {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Router;