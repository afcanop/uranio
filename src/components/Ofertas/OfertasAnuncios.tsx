import {RefreshControl, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Oferta, respuestaOfertaLista} from 'interface/ofertas';
import {consultarApi} from 'utils/api';
import {
  Actionsheet,
  AspectRatio,
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useDisclose,
  useToast,
} from 'native-base';
import Contenedor from 'common/Contenedor';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextoFecha from 'common/TextoFecha';

const OfertasAnuncios = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [recargarLista, setRecargarLista] = useState(false);
  const [arrOfertas, setArrOfertas] = useState<Oferta[]>([]);
  const usuario = useSelector((state: RootState) => state.usuario.id);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarOfertas();
      unsubscribe();
    }, []),
  );

  const consultarOfertas = async () => {
    const respuestaApiOfertaLista: respuestaOfertaLista = await consultarApi(
      'api/oferta/misofertas',
      {
        codigoUsuario: usuario,
      },
    );
    if (respuestaApiOfertaLista.error === false) {
      setArrOfertas(respuestaApiOfertaLista.ofertas);
    } else {
      toast.show({
        title: 'Algo ha salido mal',
        description: respuestaApiOfertaLista.errorMensaje,
      });
    }
  };

  const elimnarOferta = async () => {
    onClose();
    toast.show({
      title: 'En construcción',
      description: 'Proceso en construcción',
    });
  };

  return (
    <Contenedor>
      <FlatList
        data={arrOfertas}
        renderItem={({item}) => (
          <Box>
            <Box
              m={2}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              flexDirection={'row'}
              justifyContent={'space-between'}>
              <Box>
                <Image
                  source={{
                    uri: item.urlImagen,
                  }}
                  alt="Oferta sin foto"
                />
              </Box>
              <Stack p="2" space={2}>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight="400">Código:</Text>
                  <Text fontWeight="400">{item.codigoOfertaPk}</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight="400">Fecha publicación:</Text>
                  <TextoFecha fecha={item.fecha} />
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight="400">Precio:</Text>
                  <Text fontWeight="400">${item.precio}</Text>
                </HStack>
                <VStack>
                  <Text fontWeight="400">Descripción:</Text>
                  <Text fontWeight="400">{item.descripcion}</Text>
                </VStack>
              </Stack>
              <TouchableOpacity onPress={onOpen}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={30}
                  color={colores.primary}
                />
              </TouchableOpacity>
            </Box>
          </Box>
        )}
        keyExtractor={item => `${item.codigoOfertaPk}`}
        refreshControl={
          <RefreshControl
            colors={[colores.primary]}
            tintColor={colores.primary}
            refreshing={recargarLista}
            onRefresh={consultarOfertas}
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
                    Sin ofertas
                  </Heading>
                </HStack>
              </Stack>
            </Box>
          </Box>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Acciones
            </Text>
          </Box>
          <Actionsheet.Item
            onPress={() => elimnarOferta()}
            startIcon={<Icon as={Ionicons} name="trash-outline" size="6" />}>
            Eliminar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Contenedor>
  );
};

export default OfertasAnuncios;
