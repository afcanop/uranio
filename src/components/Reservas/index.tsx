import React, {useCallback, useState} from 'react';
import {Box, Center, FlatList, Text, useToast} from 'native-base';
import {RootState} from 'store/reducers';
import {useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import Contenedor from 'common/Contenedor';
import {useFocusEffect} from '@react-navigation/native';
import {ReservaDetalle, respuestaReservaDetalle} from 'interface/reserva';
import colores from 'assets/theme/colores';
import ContenedorAnimado from 'common/ContendorAnimado';
import TextoFecha from 'common/TextoFecha';
import {RefreshControl} from 'react-native-gesture-handler';
import ValidarCelda from 'common/ValidarCelda';

const Index = () => {
  const toast = useToast();
  const [recargarLista] = useState<boolean>(false);
  const [arrReservas, setArrReservas] = useState<ReservaDetalle[]>([]);
  const usuarioCodigoCelda = useSelector(
    (state: RootState) => state.usuario.celdaId,
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarReservas();
      unsubscribe();
    }, []),
  );

  const consultarReservas = async () => {
    const {respuesta, status} = await consultarApi<respuestaReservaDetalle>(
      'api/reserva/detallelista',
      {
        codigoCelda: usuarioCodigoCelda,
      },
    );
    if (status === 200) {
      setArrReservas(respuesta.reservaDetalles);
    }
  };

  return (
    <ValidarCelda>
      <Contenedor>
        <FlatList
          data={arrReservas}
          renderItem={({item, index}) => (
            <ContenedorAnimado delay={50 * index}>
              <Box
                marginBottom={2}
                padding={2}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                justifyContent={'space-between'}>
                <Center>
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={colores.primary}>
                    {item.reservaNombre}
                  </Text>
                </Center>
                <Text mt={2}>{item.reservaDescripcion}</Text>
                <Text mt={2}>Comentario: {item.comentario ?? 'No aplica'}</Text>
                <TextoFecha fecha={item.fecha} />
              </Box>
            </ContenedorAnimado>
          )}
          keyExtractor={item => `${item.codigoReservaDetallePk}`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={recargarLista}
              onRefresh={consultarReservas}
            />
          }
        />
      </Contenedor>
    </ValidarCelda>
  );
};

export default Index;
