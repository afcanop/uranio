import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Documentos from '../components/Documentos';
import colores from '../assets/theme/colores';
import IconoMenu from '../common/IconoMenu';

export type RootStackParamList = {
  DocumentosLista: undefined;
};

const DocumentosStackScreen: React.FC<any> = () => {
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
        name="DocumentosLista"
        component={Documentos}
        options={() => ({
          headerLeft: () => <IconoMenu />,
          title: 'Documentos',
        })}
      />
    </Stack.Navigator>
  );
};

export default DocumentosStackScreen;
