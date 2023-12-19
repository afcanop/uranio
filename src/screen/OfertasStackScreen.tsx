import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Ofertas from '../components/Ofertas';
import OfertaAnuncios from '../components/Ofertas/OfertasAnuncios';
import OfertaChat from '../components/Ofertas/OfertasChat';
import OfertaNuevo from '../components/Ofertas/OfertasNuevo';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
  OfertaLista: undefined;
  OfertaNuevo: undefined;
  OfertaChat: undefined;
  OfertaAnuncios: undefined;
};

const OfertastackScreen: React.FC<any> = () => {
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
        name="OfertaLista"
        component={Ofertas}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Ofertas',
        })}
      />
      <Stack.Screen
        name="OfertaNuevo"
        component={OfertaNuevo}
        options={() => ({
          title: 'Oferta nueva',
        })}
      />
      <Stack.Screen
        name="OfertaChat"
        component={OfertaChat}
        options={() => ({
          title: 'Oferta mensajes',
        })}
      />
      <Stack.Screen
        name="OfertaAnuncios"
        component={OfertaAnuncios}
        options={() => ({
          title: 'Mis anuncios',
        })}
      />
    </Stack.Navigator>
  );
};

export default OfertastackScreen;
