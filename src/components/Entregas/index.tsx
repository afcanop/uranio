/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import colores from 'assets/theme/colores';
import ContenedorAnimado from 'common/ContendorAnimado';
import Contenedor from 'common/Contenedor';
import TextoFecha from 'common/TextoFecha';
import ValidarCelda from 'common/ValidarCelda';
import { Entrega, RespuestaEntregaLista } from 'interface/entrega';
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
import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { consultarApi } from 'utils/api';
import { urlCaja, urlCajas, urlSobre } from 'utils/const';
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
  }, shallowEqual);

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
                    entregaId: item.id,
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
                            uri: obtenerUrlTipoEntrega(item.entregaTipoNombre),
                          }}
                          alt="Alternate Text"
                          size={'sm'}
                        />
                        <VStack space={1}>
                          <Text>{item.entregaTipoNombre}</Text>
                          <Text>{item.id}</Text>
                          <TextoFecha fecha={item.fechaIngreso} />
                          <Text>{item.descripcion ?? 'Sin descripción'}</Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  </Box>
                </ContenedorAnimado>
              </TouchableOpacity>
            )}
            keyExtractor={item => `${item.id}`}
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
