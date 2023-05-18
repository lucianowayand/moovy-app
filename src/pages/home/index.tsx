import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { IconButton, Title, Avatar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Movie } from '../../utils/types';
import { api } from '../../services/api';
import AppIntroSlider from "react-native-app-intro-slider"

export default function Home({ navigation }: any) {
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular
    })
    const [movies, setMovies] = useState<Movie[]>([])
    const { user } = useAuth()

    useEffect(() => {
        getMovies()
    }, [])

    async function getMovies() {
        try {
            const res = await api.get(`/library/user/${user?.id}`);
            const moviesArray = res.data.map((elements: any) => {
                return {
                    Title: elements.movie.title,
                    Year: elements.movie.year,
                    imdbID: elements.movie.imdbID,
                    Poster: elements.movie.poster,
                    imdbRating: elements.movie.imdbRating,
                    inLibrary: true,
                }
            });
            setMovies(moviesArray);

        } catch (error) {
            setMovies([]);
            alert(error);
        }
    }

    function openSettings() {
        navigation.navigate('Settings')
    }

    function MovieCards({ item }: any) {
        return <View style={{ flex: 1, backgroundColor: "white", borderRadius: 5, padding: "10%" }}>
            <Image source={{ uri: item.Poster }} style={{ height: "75%" }} />
            <View style={{ marginTop: "5%" }}>
                <Text style={{ color: "black", fontSize: 24, textAlign: "justify" }}>{item.Title}</Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:"5%"}}>
                <Avatar.Icon icon="star" size={12} style={{ backgroundColor: "orange", marginRight:"2%" }} />
                <Text>{item.imdbRating}</Text>
            </View>
        </View>
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
            <AppIntroSlider
                renderItem={MovieCards}
                data={movies}
            />
        </> : null}
    </View>
    );
};

