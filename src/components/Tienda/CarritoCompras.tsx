import {FlatList} from 'react-native';
import React from 'react';
import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import Contenedor from 'common/Contenedor';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import AjusteDeCantidadInput from 'common/AjusteDeCantidadInput';
import {retirarDelCarrito} from 'store/reducers/tiendaReducer';
import colores from 'assets/theme/colores';

const CarritoCompras = () => {
  const dispatch = useDispatch();
  const tienda = useSelector((state: RootState) => {
    console.log(state);
    return {
      carrito: state.tienda.carrito,
      totalCarrito: state.tienda.totalCarrito,
    };
  });

  const retirarProducto = (productoId: number) => {
    dispatch(retirarDelCarrito(productoId));
  };

  return (
    <Contenedor>
      <Box flex={1}>
        <FlatList
          data={tienda.carrito}
          renderItem={({item}) => (
            <VStack
              mt={2}
              padding={2}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              flexDirection={'row'}
              space={2}>
              <Image
                source={{
                  uri: 'https://semantica.sfo3.digitaloceanspaces.com/rodio/tienda/item/1.png',
                }}
                alt="Alternate Text"
                size={'sm'}
              />
              <VStack flex={1} space={2}>
                <Text>{item.nombre}</Text>
                <HStack
                  flex={1}
                  space={2}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Box flex={1}>
                    <Text>$ {item.precio}</Text>
                  </Box>
                  <VStack flex={1} space={2}>
                    <AjusteDeCantidadInput
                      productoId={item.codigoItemPk}
                      catidadInicial={item.cantidadAgregada}
                    />
                    <Button
                      colorScheme="secondary"
                      onPress={() => retirarProducto(item.codigoItemPk)}>
                      Elimiar
                    </Button>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          )}
          keyExtractor={item => `${item.codigoItemPk}`}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <Box style={{marginBottom: 50}}>
        <HStack
          justifyItems={'center'}
          justifyContent={'space-between'}
          alignContent={'space-between'}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            Total
          </Text>
          <Box backgroundColor={colores.verde['500']} p={2}>
            <Text fontWeight={'bold'} fontSize={'md'} color={colores.blanco}>
              $ {tienda.totalCarrito || 0}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Contenedor>
  );
};

export default CarritoCompras;
