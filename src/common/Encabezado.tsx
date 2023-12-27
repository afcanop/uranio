import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Menu, Pressable} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {DrawerActions} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {useDispatch} from 'react-redux';

const Encabezado = ({navigation, aplicaDetalle = false}) => {
  const dispatch = useDispatch();

  const despachoCodigo = false;

  return (
    <View style={styles.header}>
      {aplicaDetalle ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={30}
            color={colores.blanco}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="info" size={30} color={colores.primary} />
        </TouchableOpacity>
      )}
      <Menu
        w="190"
        trigger={triggerProps => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Ionicons
                name="ellipsis-vertical-circle"
                size={30}
                color={colores.blanco}
              />
            </Pressable>
          );
        }}>
        <Menu.Item onPress={() => navigation.navigate('DescargarDespacho')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Fontisto name="prescription" size={25} />
            <Text>Obtener despacho</Text>
          </View>
        </Menu.Item>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colores.primary,
  },
});

export default Encabezado;
