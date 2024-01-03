import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OfertasStackScreen from './OfertasStackScreen';
import TiendaStackScreen from './TiendaStackScreen';
import PerfilStackScreen from './PerfilStackScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import PublicacionesStackScreen from './PublicacionesStackScreen';
import ConectarCelda from 'components/ConectarCelda/ConectarCelda';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';

const Tab = createBottomTabNavigator();

export default function InicioTapStackScreen() {
  const usuarioAutenticado = useSelector((state: RootState) => {
    return {
      codigoCelda: state.usuario.codigoCelda,
    };
  });

  const visualizarInicio = () => {
    return (
      <>
        {usuarioAutenticado.codigoCelda === null ? (
          <ConectarCelda />
        ) : (
          <PublicacionesStackScreen />
        )}
      </>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colores.blanco,
        tabBarInactiveTintColor: colores.gris,
        tabBarStyle: {
          paddingHorizontal: 5,
          padding: 0,
          backgroundColor: colores.primary,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'InicioTap':
              return (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              );
            case 'OfertasTap':
              return (
                <Ionicons
                  name={focused ? 'pricetag' : 'pricetag-outline'}
                  size={size}
                  color={color}
                />
              );
            case 'TiendaTap':
              return (
                <Ionicons
                  name={focused ? 'cart' : 'cart-outline'}
                  size={size}
                  color={color}
                />
              );
            case 'PerfilTap':
              return (
                <Ionicons
                  name={focused ? 'person' : 'person-outline'}
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="InicioTap" component={() => visualizarInicio()} />
      <Tab.Screen name="OfertasTap" component={OfertasStackScreen} />
      <Tab.Screen name="TiendaTap" component={TiendaStackScreen} />
      <Tab.Screen name="PerfilTap" component={PerfilStackScreen} />
    </Tab.Navigator>
  );
}
