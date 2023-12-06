import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Perfil from '../components/Perfil';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';
import InformacionPersonal from 'components/Perfil/InformacionPersonal';
import CambioClave from 'components/Perfil/CambioClave';

export type RootStackParamList = {
    Perfil: undefined;
    InformacionPersonal: undefined;
    CambioClave: undefined;
};

const PerfilStackScreen: React.FC<any> = () => {
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
        name="Perfil"
        component={Perfil} 
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Perfil'
        })}
      />
      <Stack.Screen 
        name="InformacionPersonal"
        component={InformacionPersonal} 
        options={() => ({
          title: 'Información Personal'
        })}
      />
      <Stack.Screen 
        name="CambioClave"
        component={CambioClave} 
        options={() => ({
          title: 'Cambio de clave'
        })}
      />
    </Stack.Navigator>
  );
};

export default PerfilStackScreen;
