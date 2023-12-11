import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ConectarPanal from '../components/ConectarPanal';
import ConectarPanalQr from 'components/ConectarPanal/ConectarPanalQr';
import colores from '../assets/theme/colores';

export type RootStackParamList = {
  ConectarPanal: undefined;
  ConectarPanalQr: undefined;
};

const ConectarPanalStackScreen: React.FC<any> = () => {
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
        name="ConectarPanal"
        component={ConectarPanal}
        options={() => ({
          title: 'Conectar panal',
        })}
      />
      <Stack.Screen
        name="ConectarPanalQr"
        component={ConectarPanalQr}
        options={() => ({
          title: 'Conectar panal',
        })}
      />
    </Stack.Navigator>
  );
};

export default ConectarPanalStackScreen;
