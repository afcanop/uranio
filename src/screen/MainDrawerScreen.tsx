/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Button,
} from 'react-native';
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
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConectarCeldaStackScreen from './ConectarCeldaStackScreen';

const misRutas = [
  {
    ruta: 'Inicio',
    nombre: 'Inicio',
    icono: 'home',
  },
  {
    ruta: 'Entrega',
    nombre: 'Entrega',
    icono: 'file-tray-full',
  },
  {
    ruta: 'Visita',
    nombre: 'Visita',
    icono: 'people',
  },
  {
    ruta: 'Votacion',
    nombre: 'Votación',
    icono: 'albums',
  },
  {
    ruta: 'Reservas',
    nombre: 'Reservas',
    icono: 'calendar',
  },
  {
    ruta: 'Documentos',
    nombre: 'Documentos',
    icono: 'document-text',
  },
  {
    ruta: 'Atenciones',
    nombre: 'Atenciones',
    icono: 'alert',
  },
  {
    ruta: 'PQRS',
    nombre: 'PQRS',
    icono: 'help',
  },
  {
    ruta: 'Contactanos',
    nombre: 'Contactanos',
    icono: 'trail-sign',
  },
];

// const texto: any = {
//   Inicio:
//   Entrega: 'Entrega',
//   Visita: 'Visita',
//   Votacion: '',
//   Reservas: 'Reservas',
//   Documentos: 'Documentos',
//   Atenciones: 'Atenciones',
//   PQRS: 'PQRS',
//   Contactanos: 'Contactanos',
// };

export default function MainDrawerScreen() {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState('Inicio');

  const usuarioNombre = useSelector((state: RootState) => state.usuario.nombre);
  const usuarioImagen = useSelector(
    (state: RootState) => state.usuario.urlImagen,
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      const solicitarPermisos = async () => {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (err) {
          return true;
        }
      };
      solicitarPermisos();
    }

    // Manejar las notificaciones
    const unsubscribeFromNotifications = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {}
      }
    };

    messaging().onMessage(remoteMessage =>
      onDisplayNotification(remoteMessage),
    );

    messaging().setBackgroundMessageHandler(remoteMessage =>
      onDisplayNotification(remoteMessage),
    );

    return () => {
      // Limpieza al desmontar el componente
      unsubscribeFromNotifications();
    };
  }, []);

  async function onDisplayNotification(remoteMessage) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      badge: true,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data,
      android: {
        channelId,
        color: colores.primary,
        importance: AndroidImportance.HIGH,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://www.microtech.es/hubfs/Fotos%20blog/licencias_software.jpg',
        },
        actions: [
          {
            title: 'Ver',
            pressAction: {id: 'ver', launchActivity: 'default'},
          },
          // Otras acciones...
        ],
      },
    });

    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          navigation.navigate(detail.notification?.data.rutaApp);
          break;
      }
    });
  }

  const cerrarSession = () => {
    return Alert.alert(
      'Cerrar sesión',
      'Esta seguro de cerrar la sesión',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await AsyncStorage.getAllKeys();
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
            {misRutas.map((item, index) => (
              <Pressable
                px="5"
                py="2.5"
                bg={
                  index === props.state.index ? colores.primary : 'transparent'
                }
                onPress={() => {
                  props.navigation.navigate(item.ruta);
                }}
                key={index.toString()}>
                <HStack space="1" alignItems="center">
                  <Ionicons
                    name={
                      index === props.state.index
                        ? item.icono
                        : `${item.icono}-outline`
                    }
                    size={25}
                    color={
                      index === props.state.index
                        ? colores.blanco
                        : colores.negro
                    }
                  />
                  <Text
                    style={[
                      styles.menuItemTexto,
                      {
                        color:
                          index === props.state.index
                            ? colores.blanco
                            : colores.negro,
                      },
                    ]}>
                    {item.nombre}
                  </Text>
                  {/* {mostrarMenuItem(name, index, props.state.index)} */}
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
      <Drawer.Screen name="ConectarCelda">
        {() => <ConectarCeldaStackScreen />}
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
