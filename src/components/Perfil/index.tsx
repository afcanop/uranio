/* eslint-disable react-hooks/rules-of-hooks */
import {Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Row,
  Stack,
  Text,
  useToast,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {RootState} from 'store/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {RespuestaUsuarioDesvincularPanal} from 'interface/api/usuario';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';

const index = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      nombre: state.usuario.nombre,
      celular: state.usuario.celular,
      panal: state.usuario.codigoPanal,
      celda: state.usuario.codigoCelda,
      ciudad: state.usuario.codigoCelda,
    };
  });

  const confirmarDesvinculacionPanal = () => {
    Alert.alert(
      'Desvincular',
      'Por favor confirmar sí desea desvincularte del panal y celda',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirmar', onPress: () => desvinculacionPanal()},
      ],
    );
  };

  const desvinculacionPanal = async () => {
    const respuestaApiDesvincularPanal: RespuestaUsuarioDesvincularPanal =
      await consultarApi('api/usuario/desvincular', {
        codigoUsuario: usuario.codigo,
      });
    if (respuestaApiDesvincularPanal.error === false) {
      dispatch(
        actualizarUsuarioInformacion({
          codigoCiudad: null,
          codigoPanal: null,
          oferta: false,
          tienda: false,
        }),
      );
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiDesvincularPanal.errorMensaje,
      });
    }
  };

  return (
    <>
      <Box margin={2} alignItems={'center'} justifyContent={'center'}>
        <Avatar
          bg="cyan.500"
          size={'2xl'}
          source={{
            uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TE
        </Avatar>
        <TouchableOpacity>
          <Text>Cambiar foto del perfil</Text>
        </TouchableOpacity>
      </Box>
      <Box
        margin={2}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Datos personales
              </Heading>
              <TouchableOpacity
                onPress={() => navigation.navigate('InformacionPersonal')}>
                <Ionicons name={'pencil'} size={25} />
              </TouchableOpacity>
            </HStack>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Código:</Text>
              <Text fontWeight="400">{usuario.codigo}</Text>
            </Row>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Usuario:</Text>
              <Text fontWeight="400">{usuario.nombre}</Text>
            </Row>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Celular:</Text>
              <Text fontWeight="400">{usuario.celular}</Text>
            </Row>
          </Stack>
        </Box>
      </Box>
      <Box
        margin={2}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Panel y celda
              </Heading>
              <TouchableOpacity onPress={() => confirmarDesvinculacionPanal()}>
                <Text>Desvincular</Text>
              </TouchableOpacity>
            </HStack>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Ciudad:</Text>
              <Text fontWeight="400">{usuario.ciudad}</Text>
            </Row>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Panel:</Text>
              <Text fontWeight="400">{usuario.panal}</Text>
            </Row>
            <Row justifyContent={'space-between'}>
              <Text fontWeight="400">Celda:</Text>
              <Text fontWeight="400">{usuario.celda}</Text>
            </Row>
          </Stack>
        </Box>
      </Box>
      <Box
        margin={2}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Seguridad
              </Heading>
              <TouchableOpacity
                onPress={() => navigation.navigate('CambioClave')}>
                <Ionicons name={'pencil'} size={25} />
              </TouchableOpacity>
            </HStack>
            <Text fontWeight="400">Cambiar clave</Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default index;
