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
import ContenedorAnimado from 'common/ContendorAnimado';
import ValidarCelda from 'common/ValidarCelda';

const Index = () => {
  const [arrAtenciones, setArrAtenciones] = useState<Atencion[]>([]);
  const [recargarLista, setRecargarLista] = useState<boolean>(false);

  const toast = useToast();
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.id,
      celda: state.usuario.celdaId,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarAtenciones();
      unsubscribe();
    }, []),
  );

  const consultarAtenciones = async () => {
    const {respuesta, status} = await consultarApi<RespuestaAtencionLista>(
      'api/atencion/lista',
      {
        codigoCelda: usuario.celda,
      },
    );
    if (status === 200) {
      if (recargarLista) {
        setRecargarLista(false);
      }
      setArrAtenciones(respuesta.atenciones);
    }
  };

  return (
    <ValidarCelda>
      <Contenedor>
        <FlatList
          data={arrAtenciones}
          renderItem={({item, index}) => (
            <ContenedorAnimado delay={50 * index}>
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
            </ContenedorAnimado>
          )}
          keyExtractor={item => `${item.codigoAtencionPk}`}
          refreshControl={
            <RefreshControl
              refreshing={recargarLista}
              onRefresh={consultarAtenciones}
            />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </Contenedor>
    </ValidarCelda>
  );
};

export default Index;
