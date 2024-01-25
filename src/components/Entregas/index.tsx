/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Contenedor from 'common/Contenedor';
import {Entrega, RespuestaEntregaLista} from 'interface/entrega';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colores from 'assets/theme/colores';
import {urlCaja, urlCajas, urlSobre} from 'utils/const';
import TextoFecha from 'common/TextoFecha';
import ContenedorAnimado from 'common/ContendorAnimado';
import ValidarCelda from 'common/ValidarCelda';
type Autorizacion = 'N' | 'S' | 'P';

const EntregasLista = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [arrEntregas, setArrEntregas] = useState<Entrega[]>([]);
  const [recargarLista] = useState<boolean>(false);
  const [mostrarAnimacionCargando, setMostrarAnimacionCargando] =
    useState<boolean>(false);

  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      celda: state.usuario.celdaId,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarEntregas();
      unsubscribe();
    }, [navigation]),
  );

  const consultarEntregas = async () => {
    try {
      setMostrarAnimacionCargando(true);
      const {respuesta, status} = await consultarApi<RespuestaEntregaLista>(
        'api/entrega/lista',
        {
          codigoCelda: usuario.celda,
        },
      );

      if (status === 200) {
        setMostrarAnimacionCargando(false);
        setArrEntregas(respuesta.entregas);
      }
    } catch (error) {
      setMostrarAnimacionCargando(false);
      console.error('Error al consultar entregas:', error);
    } finally {
      setMostrarAnimacionCargando(false);
    }
  };

  const entregaAutorizar = async (
    codigoEntrega: string,
    autorizar: Autorizacion,
  ) => {
    const {respuesta, status} = await consultarApi<RespuestaEntregaLista>(
      'api/entrega/autorizar',
      {
        codigoCelda: usuario.celda,
        codigoUsuario: usuario.codigo,
        codigoEntrega,
        autorizar,
      },
    );

    if (status === 200) {
      consultarEntregas();
    }
  };

  const obtenerUrlTipoEntrega = (tipoEntrega: string) => {
    switch (tipoEntrega) {
      case 'SOBRE':
        return urlSobre;
      case 'CAJA':
        return urlCaja;
      default:
        return urlCajas;
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

  return (
    <ValidarCelda>
      <Contenedor>
        {mostrarAnimacionCargando ? (
          <Spinner size={'lg'} />
        ) : (
          <FlatList
            data={arrEntregas}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EntregaDetalle', {
                    entrega: item,
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
                    <HStack
                      flexDirection={'row'}
                      flex={2}
                      space={2}
                      justifyContent={'space-between'}>
                      <HStack space={2}>
                        <Image
                          source={{
                            uri: obtenerUrlTipoEntrega(
                              item.codigoEntregaTipoFk,
                            ),
                          }}
                          alt="Alternate Text"
                          size={'sm'}
                        />
                        <VStack space={1}>
                          <Text>{item.codigoEntregaTipoFk}</Text>
                          <Text>{item.codigoEntregaPk}</Text>
                          <TextoFecha fecha={item.fechaIngreso} />
                          <Text>{item.descripcion ?? 'Sin descripción'}</Text>
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
                              entregaAutorizar(`${item.codigoEntregaPk}`, 'S')
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
                              entregaAutorizar(`${item.codigoEntregaPk}`, 'N')
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
                                ? 'Entregado'
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
            keyExtractor={item => `${item.codigoEntregaPk}`}
            refreshControl={
              <RefreshControl
                refreshing={recargarLista}
                onRefresh={consultarEntregas}
              />
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Contenedor>
    </ValidarCelda>
  );
};

export default EntregasLista;
