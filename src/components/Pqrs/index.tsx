import React, {useCallback, useState} from 'react';
import {Box, FlatList, HStack, VStack, Text, useToast} from 'native-base';
import Contenedor from 'common/Contenedor';
import {useFocusEffect} from '@react-navigation/native';
import {consultarApi} from 'utils/api';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {Caso, respuestaCasoLista} from 'interface/pqrs';
import ContenedorAnimado from 'common/ContendorAnimado';
import {RefreshControl} from 'react-native-gesture-handler';

const Index = () => {
  const toast = useToast();
  const [arrPqrs, setArrPqrs] = useState<Caso[]>([]);
  const [recargarLista] = useState<boolean>(false);
  const usuario = useSelector((state: RootState) => {
    return {
      codigo: state.usuario.codigo,
      panal: state.usuario.codigoPanal,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPqrs();
      unsubscribe();
    }, []),
  );

  const consultarPqrs = async () => {
    const respuestaApiCiudadBuscar: respuestaCasoLista = await consultarApi(
      'api/caso/lista/v1',
      {
        codigoPanal: usuario.panal,
        codigoUsuario: usuario.codigo,
      },
    );
    if (respuestaApiCiudadBuscar.error === false) {
      setArrPqrs(respuestaApiCiudadBuscar.casos);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiCiudadBuscar.errorMensaje,
      });
    }
  };

  return (
    <Contenedor>
      <FlatList
        data={arrPqrs}
        renderItem={({item, index}) => (
          <ContenedorAnimado delay={50 * index}>
            <Box
              mb={'2'}
              padding={'2'}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              justifyContent={'space-between'}>
              <HStack>
                <VStack space={2} flex={1}>
                  <Text>{item.fecha}</Text>
                  <Text>{item.codigoCasoPk}</Text>
                </VStack>
                <VStack space={2} flex={1} alignItems={'flex-end'}>
                  <Text>
                    {item.estadoAtendido ? 'Atendido' : 'sin atender'}
                  </Text>
                  <Text>{item.estadoCerrado ? 'Atendido' : 'sin cerrar'}</Text>
                </VStack>
              </HStack>
              <Text mt={2}>{item.descripcion}</Text>
            </Box>
          </ContenedorAnimado>
        )}
        keyExtractor={item => `${item.codigoCasoPk}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={recargarLista}
            onRefresh={consultarPqrs}
          />
        }
      />
    </Contenedor>
  );
};

export default Index;
