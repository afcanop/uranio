import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Visitas from '../components/Visitas';
import VisitasNuevo from '../components/Visitas/VisitasNuevo';
import VisitasDetalle from '../components/Visitas/VisitasDetalle';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';

export type RootStackParamList = {
  VisitasLista: undefined;
  VisitasNuevo: undefined;
  VisitasDetalle: undefined;
};

const VisitasStackScreen: React.FC<any> = () => {
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
        name="VisitasLista"
        component={Visitas}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Visitas',
          headerRight: () => (
            <IconoNavegacion icon={'add-outline'} ruta={'VisitasNuevo'} />
          ),
        })}
      />
      <Stack.Screen
        name="VisitasNuevo"
        component={VisitasNuevo}
        options={() => ({
          title: 'Visita nuevo',
        })}
      />
      <Stack.Screen
        name="VisitasDetalle"
        component={VisitasDetalle}
        options={() => ({
          title: 'Visita detalle',
        })}
      />
    </Stack.Navigator>
  );
};

export default VisitasStackScreen;
