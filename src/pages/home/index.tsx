import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { IconButton, Avatar, Button, FAB, Dialog, TextInput } from 'react-native-paper';
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
    const [selectedMovie, setSelectedMovie] = useState<number>(0)
    const { user } = useAuth()

    const [dialog, setDialog] = useState<boolean>(false)

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
                    Review: elements.review,
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
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
                <Avatar.Icon icon="star" size={12} style={{ backgroundColor: "orange", marginRight: "2%" }} />
                <Text>{item.imdbRating}</Text>
            </View>
        </View>
    }


    async function updateReview(movie: Movie) {
        const res = await api.patch(`library/user/${user?.id}/movie/${movie.imdbID}`, { review: movie.Review })
        console.log(res.data)

        setDialog(false)
    }

    async function clearReview(movie: Movie) {
        const res = await api.patch(`library/user/${user?.id}/movie/${movie.imdbID}`, { review: "" })
        console.log(res.data)

        setMovies(movies.map((movie) => {
            if (movie.imdbID === movies[selectedMovie].imdbID) {
                return { ...movie, Review: "" }
            }
            return movie
        }))

        setDialog(false)
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
                dotStyle={{ backgroundColor: "#F2911B" }}
                activeDotStyle={{ backgroundColor: "#f5d538" }}
                showNextButton={false}
                showDoneButton={false}
                onSlideChange={(index) => { setSelectedMovie(index) }}
            />
            <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
                <Dialog.Title>Review</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        value={movies[selectedMovie] ? movies[selectedMovie].Review : undefined}
                        onChangeText={(text) => {
                            setMovies(movies.map((movie) => {
                                if (movie.imdbID === movies[selectedMovie].imdbID) {
                                    return { ...movie, Review: text }
                                }
                                return movie
                            }))
                        }}
                    />
                </Dialog.Content>
                <Dialog.Actions style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onPress={(text) => clearReview(movies[selectedMovie])}>Delete</Button>
                    <Button onPress={(text) => updateReview(movies[selectedMovie])}>Save</Button>
                </Dialog.Actions>
            </Dialog>
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 10,
                    bottom: 10,
                    backgroundColor: "#F2911B"
                }}
                small
                icon={movies[selectedMovie] ? (movies[selectedMovie].Review ? "pencil" : "plus") : "plus"}
                onPress={() => setDialog(true)}
            />
        </> : null}
    </View>
    );
};