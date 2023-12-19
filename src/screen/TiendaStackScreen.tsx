import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tienda from '../components/Tienda';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';
import {HStack} from 'native-base';

export type RootStackParamList = {
  Tienda: undefined;
  TiendaBusqueda: undefined;
  TiendaCarrito: undefined;
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
          headerRight: () => (
            <HStack space={5}>
              <IconoNavegacion icon={'search-outline'} ruta={'VisitasNuevo'} />
              <IconoNavegacion icon={'cart-outline'} ruta={'VisitasNuevo'} />
            </HStack>
          ),
        })}
      />
      <Stack.Screen
        name="TiendaBusqueda"
        component={Tienda}
        options={() => ({
          headerRight: () => (
            <IconoNavegacion icon={'cart-outline'} ruta={'VisitasNuevo'} />
          ),
        })}
      />
      <Stack.Screen
        name="TiendaCarrito"
        component={Tienda}
        options={() => ({
          title: 'Carrito de compras',
        })}
      />
    </Stack.Navigator>
  );
};

export default TiendaStackScreen;
