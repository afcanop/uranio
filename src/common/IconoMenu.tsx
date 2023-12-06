import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import colores from 'assets/theme/colores';

const MenuIcono = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Ionicons name="menu-outline" size={30} color={colores.blanco} />
    </TouchableOpacity>
  );
};

export default MenuIcono;
