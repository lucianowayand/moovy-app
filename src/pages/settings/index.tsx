import { View, Text } from "react-native";
import { Divider, IconButton, List } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import config from "../../../package.json";

export default function Settings({ navigation }: any) {
    const { user, logOut } = useAuth();

    function getUserInitials() {
        return user?.full_name?.split(' ').map((n) => n[0]).join('').slice(0, 2);
    }

    return <View style={{ paddingTop: "15%" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <IconButton
                icon="arrow-left"
                size={24}
                onPress={() => navigation.navigate("Home")}
            />
            <Text style={{ fontSize: 24 }}>Settings</Text>
        </View>
        <View style={{ marginTop: "10%", display: "flex", alignItems: "center" }}>
            <View style={{ borderColor: "black", borderWidth: 1, padding: 20, borderRadius: 100 }}>
                <Text style={{fontWeight:'600'}}>{getUserInitials()}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 18, marginTop: "5%" }}>{user?.full_name}</Text>
            </View>
        </View>
        <View style={{ marginHorizontal: "15%" }}>
            <View style={{ marginTop: '10%' }}>
                <List.Item
                    title="Logout"
                    left={() => <List.Icon icon="logout" />}
                    onPress={logOut}
                />
            </View>
            <Divider style={{ marginVertical: "10%" }} />
            <View style={{ display: 'flex', alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>Version</Text>
                <Text style={{ fontSize: 14 }}>{config.version}</Text>
            </View>
        </View>
    </View>
}