import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../../../assets/mapMarker/Logo.png';
import { useNavigation } from  '@react-navigation/native'

export default function SelectyLocation(){
    const navigation = useNavigation();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    function handlerNavigateToOrphanageData(){
        navigation.navigate('OrphanageData', {position});
    };

    function handleSelectMapPosition(event: MapEvent){
        setPosition(event.nativeEvent.coordinate);
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude:-6.726797023982828, 
                    longitude:-38.44958135713743,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                onPress={handleSelectMapPosition}
            >
                {position.latitude !== 0 && (
                
                <Marker
                    icon={mapMarker}
                    coordinate={{
                        latitude:position.latitude, 
                        longitude:position.longitude,
                    }}
                />)}
            </MapView>

            {position.latitude !== 0 && (
            <RectButton 
                style={styles.nexterButton}
                onPress={handlerNavigateToOrphanageData}
            >
                <Text style={styles.nexterButtonText} > Próximo </Text>
            </RectButton>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
    },
    map:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    nexterButton:{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },
    nexterButtonText:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 18,
        color: '#fff',
    }

});