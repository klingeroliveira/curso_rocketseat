import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, stopLocationUpdatesAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main( { navigation } ) {
    const [ currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

            const {latitude, longitude} = coords;

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) { 
        return null;
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style={styles.map}>
                <Marker coordinate={{latitude: -20.7673949 , longitude: -41.6742624}}>
                    <Image style={styles.avatar} source={{uri: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4'}}/>

                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: 'diego3g' });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Diego Fernandes</Text>
                            <Text style={styles.devBio}> klajsdflk asd asd fas df asdf asd fsa dasdasjhsdlkfjh lksdj hf</Text>
                            <Text style={styles.devTechs}>kjhdsf kjdjh kj hdsfjh kdfsa</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect= {false}
                />

                <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />                    
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout:{
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },
})

export default Main;