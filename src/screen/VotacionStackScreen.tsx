import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Publicaciones from '../components/Publicaciones';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
    Votaciones: undefined;
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
        name="Votaciones"
        component={Publicaciones} 
        options={() => ({
          headerLeft: () => <IconoMenu />,
        })}
      />
    </Stack.Navigator>
  );
};

export default VotacionesStackScreen;
