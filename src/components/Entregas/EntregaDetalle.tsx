import React from 'react';
import Contenedor from 'common/Contenedor';
import {Box, Center, HStack, Image, Text, VStack} from 'native-base';
import {useRoute} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {ScrollView} from 'react-native';
import TextoFecha from 'common/TextoFecha';

const EntregaDetalle = () => {
  const route = useRoute();

  const {entrega} = route.params;

  return (
    <ScrollView>
      <Contenedor>
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
              {entrega.codigoEntregaTipoFk}
            </Text>
          </Center>
          <HStack space={2}>
            <Text fontWeight={'bold'}>Código:</Text>
            <Text>{entrega.codigoEntregaTipoFk}</Text>
          </HStack>
          <HStack space={2}>
            <Text fontWeight={'bold'}>Fecha:</Text>
            <TextoFecha fecha={entrega.fechaIngreso} />
          </HStack>
          <HStack space={2}>
            <Text fontWeight={'bold'}>Descripción:</Text>
            <Text>{entrega.descripcion}</Text>
          </HStack>
        </Box>
        <>
          {entrega?.urlImagenIngreso ? (
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
                  Ingreso
                </Text>
              </Center>
              <Image
                source={{
                  uri: entrega?.urlImagenIngreso,
                }}
                alt="No presenta imagen de ingreso"
                size={'2xl'}
                width={'100%'}
                resizeMode="cover"
              />
            </Box>
          ) : null}
        </>
        <>
          {entrega?.urlImagen ? (
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
                  entrega
                </Text>
              </Center>
              <Image
                source={{
                  uri: entrega?.urlImagen,
                }}
                alt="No presenta imagen de entrega"
                size={'2xl'}
                width={'100%'}
                resizeMode="cover"
              />
            </Box>
          ) : null}
        </>
      </Contenedor>
    </ScrollView>
  );
};

export default EntregaDetalle;
