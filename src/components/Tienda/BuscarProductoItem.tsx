import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Image, Text, VStack} from 'native-base';
import {useDispatch} from 'react-redux';
import {agregarAlCarrito} from 'store/reducers/tiendaReducer';
import AjusteDeCantidadInput from 'common/AjusteDeCantidadInput';

const BuscarProductoItem = ({item}) => {
  const dispatch = useDispatch();

  const [visializarBtnAgregarCarrito, setVisializarBtnAgregarCarrito] =
    useState<boolean>(true);

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
          {visializarBtnAgregarCarrito ? (
            <Button
              onPress={() => {
                setVisializarBtnAgregarCarrito(false);
                dispatch(agregarAlCarrito(item));
              }}>
              Agregar al carro
            </Button>
          ) : (
            <AjusteDeCantidadInput
              productoId={item.codigoItemPk}
              catidadInicial={'0'}
              sinCantidad={() => setVisializarBtnAgregarCarrito(true)}
            />
          )}
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default BuscarProductoItem;
