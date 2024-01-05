import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Publicaciones from '../components/Publicaciones';
import PublicacionesComentarios from '../components/Publicaciones/PublicacionesComentarios';
import PublicacionesReporte from '../components/Publicaciones/PublicacionesReporte';
import PublicacionNuevo from '../components/Publicaciones/PublicacionNuevo';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';
import GaleriaScreen from 'common/GaleriaScreen';

export type RootStackParamList = {
  Publicaciones: undefined;
  PublicacionesComentarios: undefined;
  PublicacionNuevo: undefined;
  PublicacionesReporte: {codigoPublicacionPk: number};
  ModalGaleriaScreen: {RutaAnterior: string};
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
      <Stack.Group>
        <Stack.Screen
          name="Publicaciones"
          component={Publicaciones}
          options={() => ({
            headerLeft: () => <IconoMenu />,
            headerRight: () => (
              <IconoNavegacion icon={'add-outline'} ruta={'PublicacionNuevo'} />
            ),
          })}
        />
        <Stack.Screen
          name="PublicacionNuevo"
          component={PublicacionNuevo}
          options={() => ({
            title: 'Nuevo',
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
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="ModalGaleriaScreen"
          component={GaleriaScreen}
          initialParams={{RutaAnterior: 'PublicacionNuevo'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PublicacionesStackScreen;
