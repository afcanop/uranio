/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Reservas from '../components/Reservas';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';
import ReservaNuevo from 'components/Reservas/ReservaNuevo';
import ReservaDetalle from 'components/Reservas/ReservaDetalle';

export type RootStackParamList = {
  ReservaLista: undefined;
  ReservaNuevo: undefined;
  ReservaDetalle: undefined;
};

const ReservasStackScreen: React.FC<any> = () => {
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
        name="ReservaLista"
        component={Reservas}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Reservas',
          headerRight: () => (
            <IconoNavegacion icon={'add-outline'} ruta={'ReservaNuevo'} />
          ),
        })}
      />
      <Stack.Screen
        name="ReservaNuevo"
        component={ReservaNuevo}
        options={() => ({
          title: 'Reserva nuevo',
        })}
      />
      <Stack.Screen
        name="ReservaDetalle"
        component={ReservaDetalle}
        options={() => ({
          title: 'Reserva detalle',
        })}
      />
    </Stack.Navigator>
  );
};

export default ReservasStackScreen;
