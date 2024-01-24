import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import colores from '../assets/theme/colores';
import ConectarCelda from 'components/ConectarCelda/ConectarCelda';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
  ConectarCelda: undefined;
};

const ConectarCeldaStackScreen: React.FC<any> = () => {
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
        name="ConectarCelda"
        component={ConectarCelda}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Asignar celda',
        })}
      />
    </Stack.Navigator>
  );
};

export default ConectarCeldaStackScreen;
