import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function Home({ navigation }: any) {
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular
    })

    const openSettings = () => {
        navigation.navigate('Settings')
    }

    return (<View style={{ height: '100%', width: '100%', backgroundColor: '#dce0e2', padding: '10%' }}>
        {fontsLoaded ? <>
            <View style={{ marginTop: "5%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontFamily: "Inter_700Bold", color: "#F2911B" }}>My Library</Text>
                <IconButton
                    icon="menu"
                    size={20}
                    onPress={openSettings}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: "white", width: '100%', height: '95%', padding: 50, borderRadius: 5 }}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                    </View>
                </View>
            </View>
        </> : null}
    </View>
    );
};

const styles = {
    width: 1,
};
