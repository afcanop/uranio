import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../components/Login';
import CrearCuenta from '../components/CrearCuenta';
import OlvidoContrasena from '../components/OlvidoContrasena';
import SolicitarAyuda from '../components/SolicitarAyuda';
import colores from '../assets/theme/colores';

export type RootStackParamList = {
  Login: undefined;
  CrearCuenta: undefined;
  OlvidoClave: undefined;
  SolicitarAyuda: undefined;
};

const LoginStackScreen: React.FC<any> = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colores.blanco,
        headerStyle: {
          backgroundColor: colores.primary,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CrearCuenta" component={CrearCuenta} />
      <Stack.Screen name="OlvidoClave" component={OlvidoContrasena} />
      <Stack.Screen name="SolicitarAyuda" component={SolicitarAyuda} />
    </Stack.Navigator>
  );
};

export default LoginStackScreen;
