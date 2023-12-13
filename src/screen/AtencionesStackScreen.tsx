import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Atenciones from '../components/Atenciones';
import AtencionNuevo from '../components/Atenciones/AtencionNuevo';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import IconoNavegacion from 'common/IconoNavegacion';

export type RootStackParamList = {
  atencion: undefined;
  atencionNuevo: undefined;
};

const AtencionStackScreen: React.FC<any> = () => {
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
        name="atencion"
        component={Atenciones}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Atención',
          headerRight: () => (
            <IconoNavegacion icon={'add-outline'} ruta={'atencionNuevo'} />
          ),
        })}
      />
      <Stack.Screen
        name="atencionNuevo"
        component={AtencionNuevo}
        options={() => ({
          title: 'Atención nuevo',
        })}
      />
    </Stack.Navigator>
  );
};

export default AtencionStackScreen;
