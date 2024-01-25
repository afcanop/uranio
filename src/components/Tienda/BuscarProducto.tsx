import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  FlatList,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from 'native-base';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextoFecha from 'common/TextoFecha';
import AjusteDeCantidadInput from 'common/AjusteDeCantidadInput';
import {useDispatch} from 'react-redux';
import {agregarAlCarrito} from 'store/reducers/tiendaReducer';
import {consultarApi} from 'utils/api';
import {RespuestaItemBuscarItem} from 'interface/tienda';
import Contenedor from 'common/Contenedor';
import BuscarProductoItem from './BuscarProductoItem';

const BuscarProducto = () => {
  const toast = useToast();
  const [nombre, setNombre] = useState<string>('');
  const [arrProductos, setArrProductos] = useState<any[]>([]);

  const buscarItem = async (itemNombre: string) => {
    setNombre(itemNombre);
    if (itemNombre.length >= 3) {
      const {respuesta, status} = await consultarApi<RespuestaItemBuscarItem>(
        'api/item/buscaritem',
        {
          itemNombre: nombre,
        },
      );
      if (status === 200) {
        const items: any[] = [];
        for (const key in respuesta.itemes) {
          if (respuesta.itemes.hasOwnProperty(key)) {
            items.push(respuesta.itemes[key]);
          }
        }
        setArrProductos(items);
      }
    }
  };

  return (
    <>
      <HStack
        padding={2}
        bg={colores.primary}
        alignContent={'center'}
        alignItems={'center'}
        justifyContent={'space-between'}
        justifyItems={'center'}>
        <FormControl w={'70%'}>
          <Input
            value={nombre}
            onChangeText={(text: string) => buscarItem(text)}
            InputLeftElement={
              <Box ml={2}>
                <Ionicons
                  name={'search-outline'}
                  size={25}
                  color={colores.gris}
                />
              </Box>
            }
          />
        </FormControl>
        <Button
          variant={'outline'}
          endIcon={
            <Icon
              as={Ionicons}
              name="options-outline"
              size="lg"
              color={colores.blanco}
            />
          }
        />
      </HStack>
      <FlatList
        data={arrProductos}
        renderItem={({item}) => (
          <Contenedor>
            <Heading>{item.nombre}</Heading>
            <>
              {item.itemes.map((subPr: any) => (
                <BuscarProductoItem item={subPr} />
              ))}
            </>
          </Contenedor>
        )}
        keyExtractor={item => `${item}`}
      />
    </>
  );
};

export default BuscarProducto;
