import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }: any) {
    const { logIn, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular
    });

    useFocusEffect(() => {
        if (user) {
            navigation.navigate('Home')
        } else {
            getEmailFromStorage()
        }
        setLoading(false)
    });

    function submitLogin() {
        if (email === '' || password === '') {
            return
        }
        logIn(email, password)
    }

    async function getEmailFromStorage() {
        const emailCookie = await AsyncStorage.getItem('email')
        if (emailCookie) {
            setEmail(emailCookie)
        }
    }

    return <>
        {!loading ? <LinearGradient colors={['#f5d538', '#F2911B']} style={{ height: '100%', width: '100%' }}>
            {fontsLoaded ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: "white", width: '75%', padding: 50 }}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: 36, fontFamily: 'Inter_700Bold' }}>LOGIN</Text>
                    </View>
                    <View style={{ marginTop: '15%' }}>
                        <Text style={{ fontSize: 18, marginTop: 20, fontFamily: 'Inter_400Regular' }}>Email</Text>
                        <TextInput autoCapitalize='none' textContentType='emailAddress' style={{ backgroundColor: 'white' }} value={email} onChangeText={value => setEmail(value)} />
                    </View>
                    <View style={{ marginTop: '15%' }}>
                        <Text style={{ fontSize: 18, marginTop: 20, fontFamily: 'Inter_400Regular' }}>Password</Text>
                        <TextInput autoCapitalize='none' secureTextEntry={true} style={{ backgroundColor: 'white' }} value={password} onChangeText={value => setPassword(value)} />
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Button
                            mode="contained"
                            buttonColor='#F2911B'
                            textColor='white'
                            style={{ borderRadius: 5 }}
                            onPress={submitLogin}
                        >
                            Login
                        </Button>
                    </View>
                </View>
            </View>) : null}
        </LinearGradient>
            : null}
    </>
};