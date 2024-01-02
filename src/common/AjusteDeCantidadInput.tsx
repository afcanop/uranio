import React, {useState} from 'react';
import {Input, Pressable} from 'native-base';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {
  actualizarCantidadEnCarrito,
  retirarDelCarrito,
} from 'store/reducers/tiendaReducer';

interface AjusteDeCantidadInputProps {
  catidadInicial: string;
  productoId: number;
  sinCantidad?: () => void;
}

const AjusteDeCantidadInput: React.FC<AjusteDeCantidadInputProps> = ({
  catidadInicial,
  sinCantidad,
  productoId,
}) => {
  const [cantidad, setCantidad] = useState<string>(catidadInicial);
  const dispatch = useDispatch();

  const decrementar = () => {
    const nuevaCantidad = Math.max(parseInt(cantidad, 10) - 1, 0);
    if (nuevaCantidad <= 0) {
      dispatch(retirarDelCarrito(productoId));
      if (sinCantidad) {
        sinCantidad();
      }
    } else {
      setCantidad(nuevaCantidad.toString());
      dispatch(
        actualizarCantidadEnCarrito({
          productoId,
          cantidadAgregada: nuevaCantidad,
        }),
      );
    }
  };

  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad, 10) + 1;
    setCantidad(nuevaCantidad.toString());
    dispatch(
      actualizarCantidadEnCarrito({
        productoId,
        cantidadAgregada: nuevaCantidad,
      }),
    );
  };

  return (
    <Input
      value={cantidad.toString()}
      keyboardType="numeric"
      type="text"
      textAlign={'right'}
      onChangeText={(text: string) => setCantidad(text)}
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
  );
};

export default AjusteDeCantidadInput;
