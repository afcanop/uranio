import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tienda from '../components/Tienda';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
    Tienda: undefined;
};

const TiendaStackScreen: React.FC<any> = () => {
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
        name="Tienda"
        component={Tienda} 
        options={() => ({
          headerLeft: () => <IconoMenu />,
        })}
      />
    </Stack.Navigator>
  );
};

export default TiendaStackScreen;
