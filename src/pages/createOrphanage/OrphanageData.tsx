import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Switch, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagesPicker from  'expo-image-picker';

import api from '../../services/api';

interface Positions{
    latitude: number;
    longitude: number;
};

interface ParamsPosition{
    position: Positions;
};

// import { Container } from './styles';
export default function OrphanageData() {

    const route = useRoute();
    const params = route.params as ParamsPosition;
    const navigation = useNavigation()
    
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [openOnWeekends, setOpenOnWeekends] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    async function handleCreateOrphanage (){

        const {latitude, longitude} = params.position;

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('openingHours', openingHours);
        data.append('openOnWeekends', String(openOnWeekends));

        images.forEach((imageURI, index)=>{
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: imageURI,
            } as any );
        });

        console.log(data)

        await api.post('orfanato', data);
        navigation.navigate('OrphanageMap')
    }

    async function handleSelectImages() {
        const { status } = await ImagesPicker.requestCameraPermissionsAsync();

        if(status !== 'granted'){
            alert("You haven't camera roll acess!");
            return;
        };
        const result = await ImagesPicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality:1,
            mediaTypes: ImagesPicker.MediaTypeOptions.Images,
        });

        if(result.cancelled){
            return;
        }
        const { uri } = result;

        setImages([...images, uri])
    }

    function changeValueOpenOnWeekends(){
        setOpenOnWeekends(!openOnWeekends);
    }

    return (
       <ScrollView 
        style={styles.container}
       >
           <Text style={ styles.title }> Dados </Text>

           <Text style={ styles.label }> Nome </Text>
           <TextInput 
                style={ styles.input }
                value={name}
                onChangeText={text=>setName(text)}
           />

           <Text style={ styles.label }> Sobre </Text>
           <TextInput multiline style={[ styles.input, {height: 110} ]}
                value={about}
                onChangeText={setAbout}
           />

           <Text style={ styles.label }> Whatsapp </Text>
           <TextInput style={ styles.input }></TextInput>

           <Text style={ styles.label }> Fotos </Text>

            <View style={styles.imageContainer}>
           {images.map(imageUri=>{
               return(
                   <Image
                        style={styles.image}
                        key={imageUri}
                        source={{ uri:imageUri }}
                   />
               )
           })}
           </View>

           <TouchableOpacity 
                style={styles.imageInput}
                onPress={handleSelectImages}
           >
               <Feather name='plus' size={28} color={'#458500'} />
           </TouchableOpacity>

           <Text style={ styles.title }> Visitação </Text>

           <Text style={ styles.label }> Instruções </Text>
           <TextInput multiline style={[ styles.input, {height: 110} ]}
                value={instructions}
                onChangeText={setInstructions}
           />

           <Text style={ styles.label }> Horário de Visita </Text>
           <TextInput style={ styles.input }
                value={openingHours}
                onChangeText={setOpeningHours}
           />

            <View style={ styles.switch }>
            <Switch
                    thumbColor='#fff'
                    trackColor={{ false:'#ccc', true: '#39cc83' }}
                    value={openOnWeekends}
                    onValueChange={ changeValueOpenOnWeekends }
                />
                <Text style={ styles.label }>Atende Final de Semana</Text>
                
            </View>

            <RectButton style={ styles.nextButton } onPress={handleCreateOrphanage}>
                <Text style={ styles.nextButtonText }>Cadatrar</Text>
            </RectButton>

       </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10
    },
    title:{
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        color: '#5c8599',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#d3e2e6'
    },
    label:{
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        marginBottom:8,
    },
    input:{
        backgroundColor: '#fff',
        borderWidth:1.4,
        borderColor: '#d3e2e6',
        borderRadius:20,
        height:56,
        paddingVertical:18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    imageInput:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96d2f0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    switch:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    nextButton:{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },
    nextButtonText:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize:18,
        color: '#fff',
    },
    image:{
        width: 100,
        height: 100,
        borderColor: '#96d2f0',
        borderWidth: 1.4,
        marginVertical: 10,
        marginHorizontal: 5,
        
    },
    imageContainer:{
        flexDirection:"row",
    }
})