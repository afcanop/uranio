import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Votaciones from '../components/Votaciones';
import votacionesQr from '../components/Votaciones/VotacionesQr';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';

export type RootStackParamList = {
  VotacionLista: undefined;
  VotacionQR: undefined;
};

const VotacionesStackScreen: React.FC<any> = () => {
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
        name="VotacionLista"
        component={Votaciones}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Votaciones',
          headerRight: () => (
            <IconoNavegacion icon={'qr-code-outline'} ruta={'VotacionQR'} />
          ),
        })}
      />
      <Stack.Screen
        name="VotacionQR"
        component={votacionesQr}
        options={() => ({
          title: 'Votacion qr',
        })}
      />
    </Stack.Navigator>
  );
};

export default VotacionesStackScreen;
