import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Publicaciones from '../components/Publicaciones';
import PublicacionesComentarios from '../components/Publicaciones/PublicacionesComentarios';
import PublicacionesReporte from '../components/Publicaciones/PublicacionesReporte';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
  Publicaciones: undefined;
  PublicacionesComentarios: undefined;
  PublicacionesReporte: {codigoPublicacionPk: number};
};

const PublicacionesStackScreen = () => {
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
      <Stack.Screen
        name="Publicaciones"
        component={Publicaciones}
        options={() => ({
          headerLeft: () => <IconoMenu />,
        })}
      />
      <Stack.Screen
        name="PublicacionesComentarios"
        component={PublicacionesComentarios}
        options={() => ({
          title: 'Comentarios',
        })}
      />
      <Stack.Screen
        name="PublicacionesReporte"
        component={PublicacionesReporte}
        options={() => ({
          title: 'Reportes',
        })}
      />
    </Stack.Navigator>
  );
};

export default PublicacionesStackScreen;
