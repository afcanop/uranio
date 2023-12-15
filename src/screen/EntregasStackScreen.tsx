import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Entrega from '../components/Entregas';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import EntregaDetalle from 'components/Entregas/EntregaDetalle';
import {Entrega as interfaceEntrega} from 'interface/entrega';

export type RootStackParamList = {
  EntregaLista: undefined;
  EntregaDetalle: {entrega: interfaceEntrega};
};

const EntregasStackScreen: React.FC<any> = () => {
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
        name="EntregaLista"
        component={Entrega}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Entregas',
        })}
      />
      <Stack.Screen
        name="EntregaDetalle"
        component={EntregaDetalle}
        options={() => ({
          title: 'Entrega detalle ',
        })}
      />
    </Stack.Navigator>
  );
};

export default EntregasStackScreen;
