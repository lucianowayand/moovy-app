import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64'

interface User {
    id: number;
    full_name: string;
    email: string;
}

interface AuthContextValues {
    user: User | null | undefined;
    setUser: (user: User | null) => void;
    logOut: () => void;
    logIn: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextValues>({
    user: undefined,
    setUser: () => { },
    logOut: () => { },
    logIn: () => { }
})

function AuthProvider({ children, navigation }: { children: React.ReactNode, navigation: any }) {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        getUserFromSession()
    }, [])
    
    async function getUserFromSession() {
        try {
            const jwt = await AsyncStorage.getItem('session')
            if (jwt !== null) {
                const jwtUser = jwt.split('.')[1];
                const user = JSON.parse(decode(jwtUser));
                setUser({
                    id: user.sub,
                    full_name: user.full_name,
                    email: user.email
                });
                navigation.navigate('Home')

            } else {
                if (window.location.pathname !== '/') {
                    logOut()
                }
            }
            return user
        } catch (err) {
            console.log(err);
        }
    }


    // Printing user for debugging purposes
    useEffect(() => {
        console.log(user)
    }, [user])

    function logOut() {
        navigation.navigate('Login')
        AsyncStorage.removeItem('session')
        setUser(undefined);
    }

    async function logIn(email: string, password: string) {
        try {
            const res = await api.post("/users/login", { email, password });
            await AsyncStorage.setItem('session', JSON.stringify(res.data))
            await AsyncStorage.setItem('email', email)
            getUserFromSession()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, logIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };