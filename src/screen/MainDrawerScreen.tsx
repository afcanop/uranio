/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
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
  useToast,
  VStack,
  Image,
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
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {
  Notification,
  NotificationCompletion,
  Notifications,
} from 'react-native-notifications';

export default function MainDrawerScreen() {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const toast = useToast();
  const [initialRoute, setInitialRoute] = useState('Inicio');

  const codigoUsuario = useSelector((state: RootState) => state.usuario.codigo);
  const usuarioNombre = useSelector((state: RootState) => state.usuario.nombre);
  const usuarioImagen = useSelector(
    (state: RootState) => state.usuario.urlImagen,
  );

  Notifications.setNotificationChannel({
    channelId: 'my-channel',
    name: 'My Channel',
    importance: 5,
    description: 'My Description',
    enableLights: true,
    enableVibration: true,
    groupId: 'my-group', // optional
    groupName: 'My Group', // optional, will be presented in Android OS notification permission
    showBadge: true,
    soundFile: 'custom_sound.mp3', // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
    vibrationPattern: [200, 1000, 500, 1000, 500],
  });

  useEffect(() => {
    const desuscribirEnMensaje = messaging().onMessage(async remoteMessage => {
      // Manejar la notificación cuando la aplicación está en primer plano
      Notifications.removeAllDeliveredNotifications();
      toast.show({
        render: () => {
          return (
            <Pressable
              onPress={() => {
                toast.closeAll();
                navigation.navigate(remoteMessage.data.rutaApp, {
                  screen: `${remoteMessage.data.rutaApp}Lista`,
                  initial: false,
                });
              }}>
              <HStack
                bg="emerald.500"
                px="2"
                py="1"
                rounded="sm"
                mb={5}
                justifyContent={'space-around'}>
                <VStack>
                  <Text bold> {remoteMessage.notification?.title}</Text>
                  <Text> {remoteMessage.notification?.body} </Text>
                </VStack>
                <Image
                  style={{width: 64, height: 64}}
                  source={require('../assets/img/logo-fondo-blanco.png')}
                />
              </HStack>
            </Pressable>
          );
        },
      });
    });

    const desuscribirEnNotificacionAbierta =
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.rutaApp);
      });

    const desuscribirNoficiacionAppCerrada =
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        // Navega a la pantalla de notificación cuando la aplicación se abra
        setInitialRoute(remoteMessage.data.rutaApp);
      });
    return () => {
      desuscribirEnMensaje();
      desuscribirEnNotificacionAbierta();
      desuscribirNoficiacionAppCerrada();
    };
  }, []);

  Notifications.registerRemoteNotifications();

  const mostrarMenuItem = (nombre: any, index: any, stateIndex: any) => {
    const iconos: any = {
      Inicio: 'home',
      Entrega: 'file-tray-full',
      Visita: 'people',
      Votacion: 'albums',
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

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
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
        {() => <InicioTapStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Entrega">
        {() => <EntregasStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Visita">
        {() => <VisitasStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Votacion">
        {() => <VotacionStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Reservas">
        {() => <ReservasStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Documentos">
        {() => <DocumentosStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="Atenciones">
        {() => <AtencionesStackScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="PQRS">{() => <PqrsStackScreen />}</Drawer.Screen>
      <Drawer.Screen name="Contactanos">
        {() => <ContactanosStackScreen />}
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
