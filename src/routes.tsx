import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import OrphanageMap from './pages/orphanageMap';
import OrphanageDetails from './pages/orphanageDetails';
import SelectLocation from './pages/createOrphanage/SelectLocation';
import OrphanageData from './pages/createOrphanage/OrphanageData';
import Header from './components/Header';
// import { Container } from './styles';

const {Navigator, Screen} = createStackNavigator();
export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator 
            screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}>
                <Screen 
                    name="OrphanageMap" 
                    component={OrphanageMap}/>
                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Orfanato' showX={false}/>
                    }}/>
                <Screen 
                    name="SelectLocation" 
                    component={SelectLocation}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Selecione a localização'/>
                    }}/>
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Informe os dados'/>
                    }}/>
            </Navigator>
        </NavigationContainer>
    );
}