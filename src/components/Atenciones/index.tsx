import {FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Box, Text, HStack, Heading, Stack, VStack, useToast} from 'native-base';
import {RefreshControl} from 'react-native-gesture-handler';
import Contenedor from 'common/Contenedor';
import {useFocusEffect} from '@react-navigation/native';
import {Atencion, RespuestaAtencionLista} from 'interface/atencion';
import {consultarApi} from 'utils/api';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import colores from 'assets/theme/colores';

const Index = () => {
  const [arrAtenciones, setArrAtenciones] = useState<Atencion[]>([]);
  const [recargarLista, setRecargarLista] = useState(false);
  const toast = useToast();
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      celda: state.usuario.codigoCelda,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPqrs();
      unsubscribe();
    }, []),
  );

  const consultarPqrs = async () => {
    const respuestaApiContenidoLista: RespuestaAtencionLista =
      await consultarApi('api/atencion/lista', {
        codigoCelda: 23,
      });
    if (respuestaApiContenidoLista.error === false) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      setArrAtenciones(respuestaApiContenidoLista.atenciones);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiContenidoLista.errorMensaje,
      });
    }
  };

  return (
    <Contenedor>
      <FlatList
        data={arrAtenciones}
        renderItem={({item}) => (
          <Box
            mb={2}
            padding={2}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            justifyContent={'space-between'}>
            <HStack>
              <VStack space={2} flex={1}>
                <HStack justifyContent={'space-between'}>
                  <Text>{item.fecha}</Text>
                  <Text color={colores.verde[500]}>
                    {item.estadoAtendido ? 'Atendido' : 'Sin atender'}
                  </Text>
                </HStack>

                <Text>{item.descripcion}</Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => `${item.codigoAtencionPk}`}
        refreshControl={
          <RefreshControl
            refreshing={recargarLista}
            onRefresh={consultarPqrs}
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
                    Sin Atenciones
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

export default Index;
