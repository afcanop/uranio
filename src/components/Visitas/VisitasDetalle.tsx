import React from 'react';
import {Box, Center, HStack, Text} from 'native-base';
import TextoFecha from 'common/TextoFecha';
import colores from 'assets/theme/colores';
import {useRoute} from '@react-navigation/native';

const VisitasDetalle = () => {
  const route = useRoute();

  const {vista} = route.params;

  return (
    <Box
      marginBottom={2}
      padding={2}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      justifyContent={'space-between'}>
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'} color={colores.primary}>
          {vista.nombre}
        </Text>
      </Center>
      <HStack space={2}>
        <Text fontWeight={'bold'}>Número identicación:</Text>
        <Text>{vista.numeroIdentificacion}</Text>
      </HStack>
      <HStack space={2}>
        <Text fontWeight={'bold'}>Fecha:</Text>
        <TextoFecha fecha={vista.fecha} />
      </HStack>
    </Box>
  );
};

export default VisitasDetalle;
