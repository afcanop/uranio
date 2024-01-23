/* eslint-disable react-hooks/rules-of-hooks */
import {Alert, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Row,
  ScrollView,
  Stack,
  Text,
  VStack,
  useToast,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {RootState} from 'store/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {RespuestaUsuarioDesvincularPanal} from 'interface/usuario';
import {actualizarUsuarioInformacion} from 'store/reducers/usuarioReducer';
import colores from 'assets/theme/colores';
import Contenedor from 'common/Contenedor';

const Index = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      nombre: state.usuario.nombre,
      celular: state.usuario.celular,
      panal: state.usuario.panalNombre,
      celda: state.usuario.codigoCelda,
      ciudad: state.usuario.ciudadNombre,
      imagen: state.usuario.urlImagen,
    };
  });

  const confirmarDesvinculacionPanal = () => {
    Alert.alert(
      'Desvincular',
      'Por favor confirmar sí desea desvincularte del panal y celda',
      [
        {
          text: 'Cancel',
          onPress: () => null,
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
    <Contenedor>
      <Box alignItems={'center'} justifyContent={'center'}>
        <Avatar
          bg="cyan.500"
          size={'2xl'}
          source={{
            uri: usuario.imagen,
          }}>
          {usuario.nombre}
        </Avatar>
        <TouchableOpacity onPress={() => navigation.navigate('CambioImagen')}>
          <Text fontSize={20} color={colores.primary}>
            Cambiar foto del perfil
          </Text>
        </TouchableOpacity>
      </Box>
      <VStack space={2}>
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1">
          <Stack p="3" space={2}>
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
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1">
          <Box>
            <Stack p="3" space={2}>
              <HStack space={2} justifyContent={'space-between'}>
                <Heading size="md" ml="-1">
                  Panel y celda
                </Heading>
                <TouchableOpacity
                  onPress={() => confirmarDesvinculacionPanal()}>
                  <Text fontSize={20} color={colores.primary}>
                    Desvincular
                  </Text>
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
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1">
          <Stack p="3" space={2}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Seguridad
              </Heading>
              <TouchableOpacity
                onPress={() => navigation.navigate('CambioClave')}>
                <Ionicons
                  name={'pencil'}
                  size={25}
                  color={colores.gris['600']}
                />
              </TouchableOpacity>
            </HStack>
            <Text fontWeight="400">Cambiar clave</Text>
          </Stack>
        </Box>
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1">
          <Box>
            <Pressable onPress={() => navigation.navigate('EliminarCuenta')}>
              <Stack p="3" space={2}>
                <HStack space={2} justifyContent={'space-between'}>
                  <Box>
                    <Heading size="md" ml="-1">
                      ¿Eliminar o desactivar cuanta?
                    </Heading>
                    <Text>
                      Averigua como puedes ¿Eliminar o desactivar cuanta?
                    </Text>
                  </Box>
                  <Ionicons
                    name={'arrow-forward-sharp'}
                    size={30}
                    color={colores.gris['600']}
                  />
                </HStack>
              </Stack>
            </Pressable>
          </Box>
        </Box>
      </VStack>
    </Contenedor>
  );
};

export default Index;
