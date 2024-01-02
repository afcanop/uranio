import React, {useState} from 'react';
import {Input, Pressable, Text} from 'native-base';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  actualizarCantidadEnCarrito,
  retirarDelCarrito,
} from 'store/reducers/tiendaReducer';
import {RootState} from 'store/reducers';
import {Carrito} from 'interface/tienda';

interface AjusteDeCantidadInputProps {
  productoId: number;
  catidadInicial: number;
  sinCantidad?: () => void;
}

const AjusteDeCantidadInput: React.FC<AjusteDeCantidadInputProps> = ({
  catidadInicial,
  sinCantidad,
  productoId,
}) => {
  const dispatch = useDispatch();

  const decrementar = () => {
    const nuevaCantidad = catidadInicial - 1;
    if (nuevaCantidad <= 0) {
      dispatch(retirarDelCarrito(productoId));
      if (sinCantidad) {
        sinCantidad();
      }
    } else {
      dispatch(
        actualizarCantidadEnCarrito({
          productoId,
          cantidadAgregada: nuevaCantidad,
        }),
      );
    }
  };

  const incrementar = () => {
    const nuevaCantidad = catidadInicial + 1;
    dispatch(
      actualizarCantidadEnCarrito({
        productoId,
        cantidadAgregada: nuevaCantidad,
      }),
    );
  };

  return (
    <>
      <Input
        value={catidadInicial.toString()}
        keyboardType="numeric"
        type="text"
        textAlign={'right'}
        onChangeText={(text: string) => setCantidad(parseInt(text, 10))}
        InputLeftElement={
          <Pressable ml={2} onPress={() => decrementar()}>
            <Ionicons
              name={'remove-circle-outline'}
              size={25}
              color={colores.gris}
            />
          </Pressable>
        }
        InputRightElement={
          <Pressable mr={2} onPress={() => incrementar()}>
            <Ionicons
              name={'add-circle-outline'}
              size={25}
              color={colores.gris}
            />
          </Pressable>
        }
      />
    </>
  );
};

export default AjusteDeCantidadInput;
