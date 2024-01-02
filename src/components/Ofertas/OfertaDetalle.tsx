import React from 'react';
import {
  AspectRatio,
  Center,
  HStack,
  Heading,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import Contenedor from 'common/Contenedor';
import {useRoute} from '@react-navigation/native';
import TextoFecha from 'common/TextoFecha';
import colores from 'assets/theme/colores';

const OfertaDetalle = () => {
  const {oferta} = useRoute().params;

  return (
    <ScrollView>
      <Contenedor>
        <VStack
          m={2}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          space={2}>
          <Center>
            <Heading color={colores.primary} fontWeight="bold" fontSize={'4xl'}>
              Información
            </Heading>
          </Center>
          <Stack p="2" space={2}>
            <HStack justifyContent={'space-between'}>
              <Text fontWeight="bold">Código:</Text>
              <Text fontWeight="400">{oferta.codigoOfertaPk}</Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text fontWeight="bold">Fecha publicación:</Text>
              <TextoFecha fecha={oferta.fecha} />
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text fontWeight="bold">Precio:</Text>
              <Text fontWeight="400">${oferta.precio}</Text>
            </HStack>
            <VStack>
              <Text fontWeight="bold">Descripción:</Text>
              <Text fontWeight="400">{oferta.descripcion}</Text>
            </VStack>
            {oferta.urlImagen ? (
              <AspectRatio w="100%">
                <Image
                  source={{
                    uri: oferta.urlImagen,
                  }}
                  alt="image"
                  resizeMode="contain"
                />
              </AspectRatio>
            ) : null}
          </Stack>
        </VStack>
      </Contenedor>
    </ScrollView>
  );
};

export default OfertaDetalle;
