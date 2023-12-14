import React, {useCallback, useState} from 'react';
import {Box, Center, FlatList, Text, useToast} from 'native-base';
import {RootState} from 'store/reducers';
import {useSelector} from 'react-redux';
import {consultarApi} from 'utils/api';
import Contenedor from 'common/Contenedor';
import {useFocusEffect} from '@react-navigation/native';
import {ReservaDetalle, respuestaReservaDetalle} from 'interface/reserva';
import colores from 'assets/theme/colores';

const Index = () => {
  const toast = useToast();
  const [arrReservas, setArrReservas] = useState<ReservaDetalle[]>([]);
  const usuarioCodigoCelda = useSelector(
    (state: RootState) => state.usuario.codigoCelda,
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarPqrs();
      unsubscribe();
    }, []),
  );

  const consultarPqrs = async () => {
    const respuestaApiReservaDetalle: respuestaReservaDetalle =
      await consultarApi('api/reserva/detallelista', {
        codigoCelda: 22,
      });
    if (respuestaApiReservaDetalle.error === false) {
      setArrReservas(respuestaApiReservaDetalle.reservaDetalles);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiReservaDetalle.errorMensaje,
      });
    }
  };

  return (
    <Contenedor>
      <FlatList
        data={arrReservas}
        renderItem={({item}) => (
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
            <Text mt={2}>Comentario: {item.comentario}</Text>
            <Text mt={2}>{item.fecha}</Text>
          </Box>
        )}
        keyExtractor={item => `${item.codigoReservaDetallePk}`}
      />
    </Contenedor>
  );
};

export default Index;
