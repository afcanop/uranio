import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ConectarPanal from '../components/ConectarPanal';
import colores from '../assets/theme/colores';

export type RootStackParamList = {
  ConectarPanal: undefined;
};

const ConectarPanalStackScreen: React.FC<any> = () => {
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
        name="ConectarPanal"
        component={ConectarPanal}
        options={() => ({
          title: 'Conectar panal',
        })}
      />
    </Stack.Navigator>
  );
};

export default ConectarPanalStackScreen;
