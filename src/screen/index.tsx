import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import LoginStackScreen from './LoginStackScreen';
import {useSelector} from 'react-redux';
import MainDrawerScreen from './MainDrawerScreen';
import { RootState } from 'store/reducers';
import { StatusBar } from 'react-native';

//quietar el color gris del fondo que por defecto pone react navigation
const themeApp: any = {
  ...DefaultTheme,
  colors: {
    background: '#ffffff',
  },
};

const AppNavigator: React.FC<any> = () => {
  const usuarioAutenticado = useSelector((state: RootState) => {
    return state.usuario.autentificacion;
  });

  return (
    <NavigationContainer theme={themeApp}>
      <StatusBar
        animated={true}
        backgroundColor="#175B8E"
      />
      {usuarioAutenticado ? <MainDrawerScreen /> : <LoginStackScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
