import React, {useCallback, useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Row,
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

type Autorizacion = 'N' | 'S' | 'P';

const VisitaLista = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [arrVisitas, setArrVisitas] = useState<Visita[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);

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
    const respuestaApiVisitaLista: RespuestaVisitaLista = await consultarApi(
      'api/visita/lista',
      {
        codigoCelda: usuario.celda,
      },
    );
    if (respuestaApiVisitaLista.error === false) {
      setArrVisitas(respuestaApiVisitaLista.visitas);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiVisitaLista.errorMensaje,
      });
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
    <Contenedor>
      <FlatList
        data={arrVisitas}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VisitasDetalle', {
                vista: item,
              })
            }>
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
                  <VStack space={2}>
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
                    <TouchableOpacity
                      onPress={() =>
                        visitaAutorizar(`${item.codigoVisitaPk}`, 'S')
                      }>
                      <Ionicons
                        name={'checkmark-outline'}
                        size={50}
                        color={colores.verde['500']}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        visitaAutorizar(`${item.codigoVisitaPk}`, 'N')
                      }>
                      <Ionicons
                        name={'close-outline'}
                        size={50}
                        color={colores.rojo['500']}
                      />
                    </TouchableOpacity>
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
      />
    </Contenedor>
  );
};

export default VisitaLista;
