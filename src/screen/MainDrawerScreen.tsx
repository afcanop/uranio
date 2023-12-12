/* eslint-disable react/no-unstable-nested-components */
import React, {ReactNode} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Alert, StyleSheet} from 'react-native';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InicioTapStackScreen from './InicioTapStackScreen';
import VotacionStackScreen from './VotacionStackScreen';
import ReservasStackScreen from './ReservasStackScreen';
import DocumentosStackScreen from './DocumentosStackScreen';
import AtencionesStackScreen from './AtencionesStackScreen';
import PqrsStackScreen from './PqrsStackScreen';
import ContactanosStackScreen from './ContactanosStackScreen';
import colores from '../assets/theme/colores';
import {cerrarSesionUsuario} from 'store/reducers/usuarioReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import EntregasStackScreen from './EntregasStackScreen';
import VisitasStackScreen from './VisitasStackScreen';

export default function MainDrawerScreen() {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const codigoUsuario = useSelector((state: RootState) => state.usuario.codigo);
  const usuarioNombre = useSelector((state: RootState) => state.usuario.nombre);
  const usuarioImagen = useSelector(
    (state: RootState) => state.usuario.urlImagen,
  );

  const mostrarMenuItem = (nombre: any, index: any, stateIndex: any) => {
    const iconos: any = {
      Inicio: 'home',
      Entrega: 'file-tray-full',
      Visita: 'document-lock',
      Votacion: 'people',
      Reservas: 'calendar',
      Documentos: 'document-text',
      Atenciones: 'alert',
      PQRS: 'help',
      Contactanos: 'trail-sign',
    };

    const texto: any = {
      Inicio: 'Inicio',
      Entrega: 'Entrega',
      Visita: 'Visita',
      Votacion: 'Votación',
      Reservas: 'Reservas',
      Documentos: 'Documentos',
      Atenciones: 'ATENCIONES',
      PQRS: 'PQRS',
      Contactanos: 'Contactanos',
    };

    const icono = iconos[nombre];
    const textoItem = texto[nombre];

    if (icono !== undefined && textoItem !== undefined) {
      return (
        <>
          <Ionicons
            name={index === stateIndex ? icono : `${icono}-outline`}
            size={25}
            color={index === stateIndex ? colores.blanco : colores.negro}
          />
          <Text
            style={[
              styles.menuItemTexto,
              {
                color: index === stateIndex ? colores.blanco : colores.negro,
              },
            ]}>
            {textoItem}
          </Text>
        </>
      );
    }

    // Manejar el caso 'Contactanos' u otros casos no especificados
    return null;
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
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <Avatar
                size="48px"
                source={{
                  uri: usuarioImagen,
                }}
              />
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  bold>
                  {usuarioNombre}
                </Text>
              </VStack>
            </HStack>
          </Box>
          <VStack space="3">
            {props.state.routeNames.map((name: String, index: Number) => (
              <Pressable
                px="5"
                py="2.5"
                bg={
                  index === props.state.index ? colores.primary : 'transparent'
                }
                onPress={() => {
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
            <Pressable px="5" py="2.5" onPress={cerrarSession}>
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
    return <>{children}</>;
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 180,
        },
        sceneContainerStyle: {
          backgroundColor: colores.base[500],
        },
        drawerActiveTintColor: colores.blanco,
        drawerInactiveTintColor: colores.blanco,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Inicio">
        {props => (
          <DrawerScreenContainer>
            <InicioTapStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Entrega">
        {() => (
          <DrawerScreenContainer>
            <EntregasStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Visita">
        {() => (
          <DrawerScreenContainer>
            <VisitasStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Votacion">
        {() => (
          <DrawerScreenContainer>
            <VotacionStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Reservas">
        {() => (
          <DrawerScreenContainer>
            <ReservasStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Documentos">
        {() => (
          <DrawerScreenContainer>
            <DocumentosStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Atenciones">
        {() => (
          <DrawerScreenContainer>
            <AtencionesStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="PQRS">
        {() => (
          <DrawerScreenContainer>
            <PqrsStackScreen />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Contactanos">
        {() => (
          <DrawerScreenContainer>
            <PqrsStackScreen />
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
