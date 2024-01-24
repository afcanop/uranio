import React, {useCallback, useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Row,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  RespuestaVisitaAutorizar,
  RespuestaVisitaLista,
  Visita,
} from 'interface/visita';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import Contenedor from 'common/Contenedor';
import {RefreshControl, TouchableOpacity} from 'react-native-gesture-handler';
import TextoFecha from 'common/TextoFecha';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import {consultarApi} from 'utils/api';
import ContenedorAnimado from 'common/ContendorAnimado';
import {Pressable} from 'react-native';
import ValidarCelda from 'common/ValidarCelda';

type Autorizacion = 'N' | 'S' | 'P';

const VisitaLista = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [arrVisitas, setArrVisitas] = useState<Visita[]>([]);
  const [recargarLista] = useState<boolean>(false);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);

  const usuario = useSelector((state: RootState) => {
    return {
      celda: state.usuario.codigoCelda,
      codigo: state.usuario.codigo,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarVisitas();
      unsubscribe();
    }, []),
  );

  const consultarVisitas = async () => {
    try {
      setMostrarAnimacionCargando(true);
      const respuestaApiVisitaLista: RespuestaVisitaLista = await consultarApi(
        'api/visita/lista',
        {
          codigoCelda: usuario.celda,
        },
      );
      if (respuestaApiVisitaLista.error === false) {
        setMostrarAnimacionCargando(false);
        setArrVisitas(respuestaApiVisitaLista.visitas);
      } else {
        setMostrarAnimacionCargando(false);
        toast.show({
          title: 'Algo ha salido mal',
          description: respuestaApiVisitaLista.errorMensaje,
        });
      }
    } catch (error) {
      setMostrarAnimacionCargando(false);
      console.error('Error al consultar entregas:', error);
    } finally {
      setMostrarAnimacionCargando(false);
    }
  };

  const entregaTipoEstado = (tipoEntrega: Autorizacion) => {
    switch (tipoEntrega) {
      case 'N':
        return <Text color={colores.rojo['500']}>No autorizado</Text>;
      case 'S':
        return <Text color={colores.verde['500']}>Autorizado</Text>;
      default:
        return <Text color={colores.primary}>Pendiente</Text>;
    }
  };

  const visitaAutorizar = async (
    codigoVisita: string,
    autorizar: Autorizacion,
  ) => {
    const respuestaApiEntregaAutorizar: RespuestaVisitaAutorizar =
      await consultarApi('api/visita/autorizar', {
        codigoUsuario: usuario.codigo,
        codigoVisita,
        autorizar,
      });
    if (respuestaApiEntregaAutorizar.error === false) {
      consultarVisitas();
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiEntregaAutorizar.errorMensaje,
      });
    }
  };

  return (
    <ValidarCelda>
      <Contenedor>
        {mostrarAnimacionCargando ? (
          <Spinner size={'lg'} />
        ) : (
          <FlatList
            data={arrVisitas}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('VisitasDetalle', {
                    vista: item,
                  })
                }>
                <ContenedorAnimado delay={50 * index}>
                  <Box
                    marginBottom={2}
                    padding={2}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1">
                    <Row justifyContent={'space-between'}>
                      <Text fontWeight={'bold'}>{item.nombre}</Text>
                      <Text fontWeight={'bold'}>{item.codigoIngreso}</Text>
                    </Row>
                    <HStack
                      flexDirection={'row'}
                      flex={2}
                      space={2}
                      justifyContent={'space-between'}>
                      <HStack space={2}>
                        <VStack space={1}>
                          <Text>{item.codigoVisitaPk}</Text>
                          <Text>{item.numeroIdentificacion}</Text>
                          <TextoFecha fecha={item.fecha} />
                          <Text>Placa veiculo: {item.placa}</Text>
                        </VStack>
                      </HStack>
                      {item.estadoAutorizado === 'P' ? (
                        <HStack
                          flexDirection={'row'}
                          space={4}
                          flex={1}
                          alignContent={'center'}
                          alignItems={'center'}
                          justifyContent={'flex-end'}>
                          <Pressable
                            onPress={() =>
                              visitaAutorizar(`${item.codigoVisitaPk}`, 'S')
                            }
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed
                                  ? colores.verde['100']
                                  : 'transparent',
                                borderRadius: 50 / 2,
                              },
                            ]}>
                            <Ionicons
                              name={'checkmark-outline'}
                              size={50}
                              color={colores.verde['500']}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() =>
                              visitaAutorizar(`${item.codigoVisitaPk}`, 'N')
                            }
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed
                                  ? colores.rojo['100']
                                  : 'transparent',
                                borderRadius: 50 / 2,
                              },
                            ]}>
                            <Ionicons
                              name={'close-outline'}
                              size={50}
                              color={colores.rojo['500']}
                            />
                          </Pressable>
                        </HStack>
                      ) : (
                        <VStack alignItems={'flex-end'}>
                          <>{entregaTipoEstado(`${item.estadoAutorizado}`)}</>
                          <Text color={colores.primary}>
                            {item.estadoCerrado
                              ? item.estadoAutorizado === 'S'
                                ? 'Ingreso'
                                : 'cerrado'
                              : 'Pendiente'}
                          </Text>
                        </VStack>
                      )}
                    </HStack>
                  </Box>
                </ContenedorAnimado>
              </TouchableOpacity>
            )}
            keyExtractor={item => `${item.codigoVisitaPk}`}
            refreshControl={
              <RefreshControl
                refreshing={recargarLista}
                onRefresh={consultarVisitas}
              />
            }
            ListEmptyComponent={
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
                        Sin visitas
                      </Heading>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Contenedor>
    </ValidarCelda>
  );
};

export default VisitaLista;
