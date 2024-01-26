import React, {useCallback, useState} from 'react';
import {
  Box,
  Button,
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
import {Alert, Pressable} from 'react-native';
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
      celda: state.usuario.celdaId,
      codigo: state.usuario.id,
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
      const {respuesta, status} = await consultarApi<RespuestaVisitaLista>(
        'api/visita/lista',
        {
          codigoCelda: usuario.celda,
        },
      );
      if (status === 200) {
        setMostrarAnimacionCargando(false);
        setArrVisitas(respuesta.visitas);
      }
    } catch (error) {
      setMostrarAnimacionCargando(false);
      console.error('Error al consultar entregas:', error);
    } finally {
      setMostrarAnimacionCargando(false);
    }
  };

  const visitaAutorizar = async (
    codigoVisita: string,
  ) => {
    try {
      const {status} = await consultarApi<RespuestaVisitaAutorizar>(
        'api/visita/autorizar',
        {
          codigoUsuario: usuario.codigo,
          codigoVisita,
        },
      );
      if (status === 200) {
        consultarVisitas();
      }
    } catch (error: any) {
      console.log(error.toJSON());
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
              <ContenedorAnimado delay={50 * index}>
                <Box
                  marginBottom={2}
                  padding={2}
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('VisitasDetalle', {
                        vista: item,
                      })
                    }>
                    <HStack justifyContent={'space-between'}>
                      <Text fontWeight={'bold'}>{item.nombre}</Text>
                      <Text fontWeight={'bold'}>{item.codigoIngreso}</Text>
                    </HStack>
                    <HStack
                      flexDirection={'row'}
                      flex={2}
                      space={2}
                      justifyContent={'space-between'}>
                      <HStack space={2}>
                        <VStack space={1}>
                          <Text>{item.id}</Text>
                          <Text>
                            {item.numeroIdentificacion !== ''
                              ? item.numeroIdentificacion
                              : 'No registra número identificación'}
                          </Text>
                          <TextoFecha fecha={item.fecha} />
                          <Text>Placa veiculo: {item.placa}</Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  </TouchableOpacity>
                  {!item.estadoAutorizado ? (
                    <HStack
                      flexDirection={'row'}
                      space={4}
                      flex={1}
                      alignContent={'center'}
                      alignItems={'center'}>
                      <Button
                        mt="2"
                        w={'full'}
                        onPress={() => visitaAutorizar(`${item.id}`, 'S')}
                        isLoading={mostrarAnimacionCargando}
                        isLoadingText="Cargando">
                        Aceptar
                      </Button>
                    </HStack>
                  ) : (
                    <Text color={colores.primary}>Ingreso</Text>
                  )}
                </Box>
              </ContenedorAnimado>
            )}
            keyExtractor={item => `${item.id}`}
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
