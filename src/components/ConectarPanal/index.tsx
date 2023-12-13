/* eslint-disable react/no-unstable-nested-components */
import {Alert, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Divider,
  FormControl,
  Image,
  Link,
  Select,
  Text,
  VStack,
  useToast,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {RespuestaCiudadBuscar} from 'interface/api/ciudad';
import {Ciudad} from 'interface/Ciudad';
import {RespuestaAsignarPanal, RespuestaPanelBuscar} from 'interface/api/panal';
import {Panal} from 'interface/panal';
import colores from 'assets/theme/colores';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {
  actualizarUsuarioInformacion,
  cerrarSesionUsuario,
} from 'store/reducers/usuarioReducer';

const ConectarPanal = () => {
  const [ciudad, setCiudad] = useState<String>('');
  const [panal, setPanal] = useState<String>('');
  const [arrCiudades, setArrCiudades] = useState<any>([]);
  const [arrPanales, setArrPanales] = useState<any>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const usuarioCodigo = useSelector((state: RootState) => state.usuario.codigo);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarCiudades();
      unsubscribe();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => cerrarSession()}>
          <Ionicons name={'exit-outline'} size={30} color={colores.blanco} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const cerrarSession = () => {
    Alert.alert(
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

  const consultarCiudades = async () => {
    const respuestaApiCiudadBuscar: RespuestaCiudadBuscar = await consultarApi(
      'api/ciudad/buscar',
      null,
    );
    if (respuestaApiCiudadBuscar.error === false) {
      setArrCiudades(respuestaApiCiudadBuscar.ciudades);
    } else {
    }
  };

  const consultarPaneles = async (ciudadSeleccionada: any) => {
    const respuestaApiPanalBuscar: RespuestaPanelBuscar = await consultarApi(
      'api/panal/buscar',
      {
        nombre: '',
        codigoCiudad: ciudadSeleccionada,
      },
    );
    if (respuestaApiPanalBuscar.error === false) {
      setArrPanales(respuestaApiPanalBuscar.panales);
    } else {
    }
  };

  const asignarPanal = async () => {
    const respuestaApiAsignarPanal: RespuestaAsignarPanal = await consultarApi(
      'api/usuario/asignarpanal',
      {
        codigoUsuario: usuarioCodigo,
        codigoPanal: panal,
        codigoCiudad: ciudad,
      },
    );
    console.log(respuestaApiAsignarPanal);

    if (respuestaApiAsignarPanal.error === false) {
      dispatch(
        actualizarUsuarioInformacion({
          codigoCiudad: respuestaApiAsignarPanal?.ciudad,
          oferta: respuestaApiAsignarPanal.oferta,
          codigoPanal: respuestaApiAsignarPanal.panal,
          tienda: respuestaApiAsignarPanal.tienda,
        }),
      );
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiAsignarPanal.errorMensaje,
      });
    }
  };

  const btnConnectar = ciudad === '' && panal === '';

  return (
    <ScrollView>
      <Box flex={1} padding={2}>
        <VStack space={3} mt="5">
          <Center>
            <Image
              style={styles.image}
              source={require('../../assets/img/logo-fondo-blanco.png')}
            />
          </Center>
          <FormControl>
            <FormControl.Label>Ciudad</FormControl.Label>
            <Select
              selectedValue={ciudad}
              accessibilityLabel="Seleccionar ciudad"
              placeholder="Seleccionar ciudad"
              _selectedItem={{
                bg: 'teal.600',
                color: 'white',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setCiudad(itemValue);
                consultarPaneles(itemValue);
              }}>
              {arrCiudades.map((item: Ciudad) => (
                <Select.Item
                  label={item.nombre}
                  value={`${item.codigoCiudadPk}`}
                />
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label>Panal</FormControl.Label>
            <Select
              selectedValue={panal}
              accessibilityLabel="Seleccionar panal"
              placeholder="Seleccionar panal"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setPanal(itemValue)}>
              {arrPanales.map((item: Panal) => (
                <Select.Item
                  label={item.nombre}
                  value={`${item.codigoPanalPk}`}
                />
              ))}
            </Select>
          </FormControl>
          <Button
            mt="2"
            isDisabled={btnConnectar}
            onPress={() => asignarPanal()}>
            Connectar
          </Button>
          <Divider />
          <Center>
            <TouchableOpacity
              onPress={() => navigation.navigate('ConectarPanalQr')}>
              <Text>O leer qr</Text>
              <Ionicons
                name={'qr-code-outline'}
                size={60}
                color={'coolGray.800'}
              />
            </TouchableOpacity>
          </Center>
          <Divider />
          <Center>
            <Link>No encuentras tu panal</Link>
          </Center>
          <Divider />
          <Text>
            Si no encuentras tu panal, escríbenos, estamos vinculando nuevos
            panales a nuestra comunidad; disfruta de los servicios como anuncios
            de paquetes con foto, visitantes, servicios dentro de la unidad
            (electricistas, fontaneros, paseo de mascotas), votaciones para
            tomar las decisiones entre todos los miembros del panal, publicar
            artículos que tengas para la venta, tienda que te entrega en tiempo
            récord y muchas otras cosas más, No te pierdas la oportunidad de
            estar. ¿Qué es un panal? Un panal es tu unidad residencial,
            edificio, condominio y las celdas pueden ser tu oficina,
            apartamento, o finca
          </Text>
          <Center>
            <Image
              style={styles.image}
              source={require('../../assets/img/cuestionario.png')}
            />
          </Center>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ConectarPanal;

const styles = StyleSheet.create({
  image: {width: 128, height: 128},
});
