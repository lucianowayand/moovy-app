import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const Login = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <View style={{ marginTop: 50 }}>
                <Button
                    mode="outlined"
                    textColor='black'
                    style={{ borderRadius: 5 }}
                    onPress={() => navigation.navigate("Home")}
                >
                    Login
                </Button>
            </View>
        </View>
    );
};

export default Login;