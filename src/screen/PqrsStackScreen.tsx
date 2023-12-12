/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Pqrs from '../components/Pqrs';
import PqrsNuevo from '../components/Pqrs/PqrsNuevo';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';

export type RootStackParamList = {
  preguntas: undefined;
  preguntaNuevo: undefined;
};

const PqrsStackScreen: React.FC<any> = () => {
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
        name="preguntas"
        component={Pqrs}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'PQRS',
          headerRight: () => (
            <IconoNavegacion icon={'add-outline'} ruta={'preguntaNuevo'} />
          ),
        })}
      />
      <Stack.Screen
        name="preguntaNuevo"
        component={PqrsNuevo}
        options={() => ({
          title: 'Pqrs nuevo',
        })}
      />
    </Stack.Navigator>
  );
};

export default PqrsStackScreen;
