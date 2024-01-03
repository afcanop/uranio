import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tienda from '../components/Tienda';
import TiendaDetalle from '../components/Tienda/TiendaDetalle';
import CarritoCompras from '../components/Tienda/CarritoCompras';
import BuscarProducto from '../components/Tienda/BuscarProducto';
import TiendaProductoDetalle from '../components/Tienda/TiendaProductoDetalle';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';
import {Badge, HStack, VStack} from 'native-base';
import {useSelector} from 'react-redux';
import {selectCantidadProductosEnCarrito} from 'store/reducers/tiendaReducer';

export type RootStackParamList = {
  Tienda: undefined;
  TiendaBusqueda: undefined;
  TiendaCarrito: undefined;
  TiendaDetalle: undefined;
  TiendaProductoDetalle: undefined;
};

const TiendaStackScreen: React.FC<any> = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const cantidadEnCarrito = useSelector(selectCantidadProductosEnCarrito);

  const navegarAlcarrito = () => (
    <VStack>
      {cantidadEnCarrito > 0 ? (
        <Badge
          mb={-4}
          mr={-4}
          colorScheme="danger"
          rounded="full"
          zIndex={1}
          variant="subtle"
          alignSelf="flex-end"
          _text={{
            fontSize: 10,
          }}>
          {cantidadEnCarrito}
        </Badge>
      ) : null}

      <IconoNavegacion icon={'cart-outline'} ruta={'TiendaCarrito'} />
    </VStack>
  );

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
            <HStack space={5} alignItems={'center'}>
              <IconoNavegacion
                icon={'search-outline'}
                ruta={'TiendaBusqueda'}
              />
              {navegarAlcarrito()}
            </HStack>
          ),
        })}
      />
      <Stack.Screen
        name="TiendaDetalle"
        component={TiendaDetalle}
        options={() => ({
          headerRight: () => <>{navegarAlcarrito()}</>,
          title: 'Lista',
        })}
      />
      <Stack.Screen
        name="TiendaBusqueda"
        component={BuscarProducto}
        options={() => ({
          headerRight: () => <>{navegarAlcarrito()}</>,
          title: 'Busqueda',
        })}
      />
      <Stack.Screen
        name="TiendaCarrito"
        component={CarritoCompras}
        options={() => ({
          title: 'Carrito de compras',
        })}
      />
      <Stack.Screen
        name="TiendaProductoDetalle"
        component={TiendaProductoDetalle}
        options={() => ({
          headerRight: () => <>{navegarAlcarrito()}</>,
          title: 'Detalle',
        })}
      />
    </Stack.Navigator>
  );
};

export default TiendaStackScreen;
