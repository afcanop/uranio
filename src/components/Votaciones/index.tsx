import React, {useCallback, useState} from 'react';
import Contenedor from 'common/Contenedor';
import {
  Box,
  Center,
  Divider,
  FlatList,
  HStack,
  Heading,
  Icon,
  Radio,
  Stack,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {RefreshControl} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {
  RespuestaVotacionLista,
  Votacion,
  VotacionListaDetalle,
} from 'interface/votaciones';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {consultarApi} from 'utils/api';
import colores from 'assets/theme/colores';
import TextoFecha from 'common/TextoFecha';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';
import SpinerAuxiliar from 'common/SpinerAuxiliar';
import ContenedorAnimado from 'common/ContendorAnimado';
import ValidarCelda from 'common/ValidarCelda';

const VotacionLista = () => {
  const toast = useToast();
  const [arrVotacion, setArrVotacion] = useState<Votacion[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);
  const [votacionSeleccionada, setVotacionSeleccionada] = useState('');
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
      const unsubscribe = () => consultarVotaciones();
      unsubscribe();
    }, []),
  );

  const consultarVotaciones = async () => {
    const respuestaApiVisitaLista: RespuestaVotacionLista = await consultarApi(
      'api/votacion/lista',
      {
        codigoCelda: usuario.celda,
      },
    );
    if (respuestaApiVisitaLista.error === false) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      setArrVotacion(respuestaApiVisitaLista.votaciones);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiVisitaLista.errorMensaje,
      });
    }
  };

  const confirmarVotacion = async (
    codigoVotacion: number,
    codigoVotacionDetalle: string,
  ) => {
    setMostrarAnimacionCargando(false);
    setVotacionSeleccionada(codigoVotacionDetalle);
    const respuestaApiVotacionVotar: RespuestaVotacionLista =
      await consultarApi('api/votacion/votar', {
        codigoVotacion,
        codigoVotacionDetalle,
        codigoCelda: usuario.celda,
        codigoUsuario: usuario.codigo,
      });
    if (respuestaApiVotacionVotar.error === false) {
      Alert.alert('Exito', 'Se registro su voto');
      consultarVotaciones();
      setMostrarAnimacionCargando(false);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiVotacionVotar.errorMensaje,
      });
    }
  };

  return (
    <ValidarCelda>
      <Contenedor>
        <FlatList
          data={arrVotacion}
          renderItem={({item, index}) => (
            <ContenedorAnimado delay={50 * index}>
              <Box
                marginBottom={2}
                padding={2}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1">
                <Center>
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={colores.primary}>
                    {item.titulo}
                  </Text>
                </Center>
                <HStack space={2}>
                  <Text fontWeight={'bold'}>Fecha inico:</Text>
                  <TextoFecha fecha={item.fecha} />
                </HStack>
                <HStack space={2}>
                  <Text fontWeight={'bold'}>Fecha finalización:</Text>
                  <TextoFecha fecha={item.fechaHasta} />
                </HStack>
                <VStack space={1}>
                  <Text fontWeight={'bold'}>Descripción:</Text>
                  <Text>{item.descripcion}</Text>
                </VStack>
                <SpinerAuxiliar mostrarSpinner={mostrarAnimacionCargando}>
                  {item.voto ? (
                    <VStack mt={2} divider={<Divider />}>
                      {item.detalles.map((datalle: VotacionListaDetalle) => (
                        <HStack justifyContent={'space-between'}>
                          <Text>{datalle.descripcion}</Text>
                          <>
                            {item.codigoVotacionDetalle ===
                            datalle.codigoVotacionDetallePk ? (
                              <Ionicons
                                name="checkmark-outline"
                                color={colores.primary}
                                size={30}
                              />
                            ) : null}
                          </>
                        </HStack>
                      ))}
                    </VStack>
                  ) : (
                    <Radio.Group
                      name="exampleGroup"
                      accessibilityLabel="select an option"
                      onChange={codigoVotacionDetalle => {
                        confirmarVotacion(
                          item.codigoVotacionPk,
                          codigoVotacionDetalle,
                        );
                      }}
                      value={votacionSeleccionada}>
                      {item.detalles.map((datalle: VotacionListaDetalle) => (
                        <Radio
                          value={`${datalle.codigoVotacionDetallePk}`}
                          my="2"
                          size={30}
                          key={`${datalle.codigoVotacionDetallePk}`}
                          icon={
                            <Icon
                              size={25}
                              as={<Ionicons name="checkmark-outline" />}
                            />
                          }>
                          {datalle.descripcion}
                        </Radio>
                      ))}
                    </Radio.Group>
                  )}
                </SpinerAuxiliar>
              </Box>
            </ContenedorAnimado>
          )}
          keyExtractor={item => `${item.codigoVotacionPk}`}
          refreshControl={
            <RefreshControl
              refreshing={recargarLista}
              onRefresh={consultarVotaciones}
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
                      Sin Votaciones
                    </Heading>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </Contenedor>
    </ValidarCelda>
  );
};

export default VotacionLista;
