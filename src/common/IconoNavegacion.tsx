import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import colores from 'assets/theme/colores';

const IconoNavegacion = ({icon, ruta}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(ruta)}>
      <Ionicons name={icon} size={30} color={colores.blanco} />
    </TouchableOpacity>
  );
};

export default IconoNavegacion;
