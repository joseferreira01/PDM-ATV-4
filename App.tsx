import React from 'react';
import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  if(!fontsLoaded){
    return <AppLoading/>;
  }
  return (
    <Routes/>
  );
}