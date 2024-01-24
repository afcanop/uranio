import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import LoginStackScreen from './LoginStackScreen';
import MainDrawerScreen from './MainDrawerScreen';
import ConectarPanelStackScreen from './ConectarPanelStackScreen';
import {RootState} from 'store/reducers';
import {StatusBar} from 'react-native';

//quietar el color gris del fondo que por defecto pone react navigation
const themeApp: any = {
  ...DefaultTheme,
  colors: {
    background: '#ffffff',
  },
};

const AppNavigator: React.FC<any> = () => {
  const usuario = useSelector((state: RootState) => {
    return {
      autentificacion: state.usuario.autentificacion,
      panalId: state.usuario.panalId,
    };
  }, shallowEqual);

  return (
    <NavigationContainer theme={themeApp}>
      <StatusBar animated={true} backgroundColor="#175B8E" />
      {usuario.autentificacion ? (
        <>
          {usuario.panalId === null ? (
            <ConectarPanelStackScreen />
          ) : (
            <MainDrawerScreen />
          )}
        </>
      ) : (
        <LoginStackScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
