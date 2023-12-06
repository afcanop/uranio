import React, { ReactNode } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Alert, Image, StyleSheet} from 'react-native';
import {Box, Divider, HStack, Pressable, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PublicacionesStackScreen from './PublicacionesStackScreen';
import colores from '../assets/theme/colores';
import { cerrarSesionUsuario } from 'store/reducers/usuarioReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export default function MainDrawerScreen() {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const codigoUsuario = useSelector((state: RootState) => state.usuario.codigo);
  const usuarioNombre = useSelector((state: RootState) => state.usuario.nombre);
  const usuarioImagen = useSelector((state: RootState) => state.usuario.urlImagen);

  const mostrarMenuItem = (nombre, index, stateIndex) => {
    switch (nombre) {
      case 'Home':
        return (
          <>
            <Ionicons
              name={index === stateIndex ? 'home' : 'home-outline'}
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Inicio
            </Text>
          </>
        );
      case 'Entrega':
        return (
          <>
            <Ionicons
              name={index === stateIndex ? 'documents' : 'documents-outline'}
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Entrega
            </Text>
          </>
        );
      case 'Ingreso':
        return (
          <>
            <MaterialCommunityIcons
              name={
                index === stateIndex
                  ? 'archive-arrow-down'
                  : 'archive-arrow-down-outline'
              }
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Ingreso
            </Text>
          </>
        );
      case 'Perfil':
        return (
          <>
            <Ionicons
              name={index === stateIndex ? 'people' : 'people-outline'}
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Perfil
            </Text>
          </>
        );
      case 'Guia':
        return (
          <>
            <Ionicons
              name={index === stateIndex ? 'newspaper' : 'newspaper-outline'}
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Guía
            </Text>
          </>
        );
      case 'Despacho':
        return (
          <>
            <Ionicons
              name={
                index === stateIndex ? 'cloud-offline' : 'cloud-offline-outline'
              }
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Despacho
            </Text>
          </>
        );
      case 'Operador':
        return (
          <>
            <Ionicons
              name={index === stateIndex ? 'options' : 'options-outline'}
              size={25}
              color={index === stateIndex ? colores.blanco : colores.gris}
            />
            <Text
              style={[
                styles.menuItemTexto,
                {
                  color: index === stateIndex ? colores.blanco : colores.gris,
                },
              ]}>
              Operador
            </Text>
          </>
        );
    }
  };

  const cerrarSession = () => {
    return Alert.alert(
      'Cerrar sesión',
      'Esta seguro de cerrar la sesión',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(cerrarSesionUsuario());
          },
        },
      ],
      {cancelable: true},
    );
  };

  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props}>
        <VStack divider={<Divider />} space="1" my="1" mx="1">
          <Box px="4" alignItems={'center'}>
            <Image
              style={{width: 80, height: 80, borderRadius: 80 / 2}}
              source={{
                uri: usuarioImagen,
              }}
              resizeMode="contain"
            />
            <Text fontSize="16" mt="1" color={colores.blanco} fontWeight="500">
              {usuarioNombre}
            </Text>
          </Box>
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="2.5"
                bg={
                  index === props.state.index
                    ? colores.primary
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name);
                }}
                key={index.toString()}>
                <HStack space="1" alignItems="center">
                  {mostrarMenuItem(name, index, props.state.index)}
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <VStack space="2" my="1">
            <Pressable
              px="5"
              py="2.5"
              bg={colores.primary}
              onPress={cerrarSession}>
              <HStack space="3" alignItems="center">
                <Ionicons
                  name={'exit-outline'}
                  size={25}
                  color={colores.rojo[300]}
                />
                <Text
                  style={[
                    styles.menuItemTexto,
                    {
                      color: colores.rojo[300],
                    },
                  ]}>
                  Cerrar session
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    );
  };

  const DrawerScreenContainer = ({children}) => {
    return (
      <>
        {children}
      </>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 180,
          backgroundColor: colores.base[600],
        },
        sceneContainerStyle: {
          backgroundColor: colores.base[600],
        },
        drawerActiveTintColor: colores.blanco,
        drawerInactiveTintColor: colores.gris,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home">
        {props => (
          <DrawerScreenContainer>
            <DrawerScreenContainer>
              <PublicacionesStackScreen />
            </DrawerScreenContainer>
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Visitas">
        {props => (
          <DrawerScreenContainer>
            <DrawerScreenContainer>
              <PublicacionesStackScreen />
            </DrawerScreenContainer>
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuItemTexto: {
    fontWeight: '400',
    marginHorizontal: 5,
  },
});