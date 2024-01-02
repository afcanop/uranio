import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Image, Text, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {agregarAlCarrito} from 'store/reducers/tiendaReducer';
import AjusteDeCantidadInput from 'common/AjusteDeCantidadInput';
import {RootState} from 'store/reducers';
import {Carrito} from 'interface/tienda';

const BuscarProductoItem = ({item}) => {
  const dispatch = useDispatch();

  const cantidadEnCarrito = useSelector((state: RootState) => {
    const existeProductoEnCarrito = state.tienda.carrito.find(
      (producto: Carrito) => producto.codigoItemPk === item.codigoItemPk,
    );
    return {
      existeProductoEnCarrito: existeProductoEnCarrito ? true : false,
      cantidad: existeProductoEnCarrito?.cantidadAgregada,
    };
  });

  return (
    <TouchableOpacity key={`${item.nombre}`}>
      <VStack
        mt={2}
        padding={2}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        flexDirection={'row'}>
        <Image
          source={{
            uri: item.urlImagen,
          }}
          alt="Alternate Text"
          size={'sm'}
        />
        <VStack flex={1} space={2}>
          <Text>{item.nombre}</Text>
          <Text>${item.precio}</Text>
          <Text>{cantidadEnCarrito.cantidad}</Text>
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
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default BuscarProductoItem;
