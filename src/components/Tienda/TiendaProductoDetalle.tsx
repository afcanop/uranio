import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Carrito, Producto} from 'interface/tienda';
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from 'native-base';
import Contenedor from 'common/Contenedor';
import AjusteDeCantidadInput from 'common/AjusteDeCantidadInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import {agregarAlCarrito} from 'store/reducers/tiendaReducer';
import {ScrollView} from 'react-native';

const TiendaProductoDetalle = () => {
  const {item} = useRoute().params;
  const dispatch = useDispatch();
  const cantidadEnCarrito = useSelector((state: RootState) => {
    const existeProductoEnCarrito = state.tienda.carrito.find(
      (producto: Carrito) => producto.codigoItemPk === item.codigoItemPk,
    );
    return {
      existeProductoEnCarrito: existeProductoEnCarrito ? true : false,
      cantidad: existeProductoEnCarrito?.cantidadAgregada,
    };
  }, shallowEqual);

  return (
    <Contenedor>
      <ScrollView
        style={{marginBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Box
          padding={2}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: item.urlImagen,
                }}
                alt="producto sin foto"
                resizeMode="contain"
                resizeMethod="scale"
              />
            </AspectRatio>
          </Box>

          <HStack
            flex={1}
            space={2}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              {item.nombre}
            </Text>
            <Text>$ {item.precio}</Text>
          </HStack>
          <Divider my="2" />
          <VStack flex={1} space={2} justifyContent={'space-between'}>
            <Box flex={1}>
              {cantidadEnCarrito.existeProductoEnCarrito ? (
                <AjusteDeCantidadInput
                  productoId={item.codigoItemPk}
                  catidadInicial={cantidadEnCarrito.cantidad}
                />
              ) : (
                <Button
                  onPress={() => {
                    dispatch(agregarAlCarrito(item));
                  }}>
                  Agregar al carro
                </Button>
              )}
            </Box>
            <VStack flex={1} space={2} justifyContent={'space-between'}>
              <Text fontWeight={'bold'} fontSize={'md'}>
                Valor por unidad:
              </Text>
              {cantidadEnCarrito.cantidad ? (
                <Text>${item.subtotal}</Text>
              ) : (
                <Text>${item.precio}</Text>
              )}
            </VStack>
          </VStack>
          <Divider my="2" />
          <VStack flex={1} space={2} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              Detalle
            </Text>
            <Text>
              La información del producto o del empaque que se muestra pueden no
              ser completas. Dicha información está sujeta a cambios en
              cualquier momento sin previo aviso; Consulte siempre el producto
              físico para obtener la información y las advertencias con
              precisión. Comuníquese directamente con el minorista o el
              fabricante para obtener información adicional.
            </Text>
          </VStack>
        </Box>
      </ScrollView>
    </Contenedor>
  );
};

export default TiendaProductoDetalle;
