import React, {useState} from 'react';
import {
  AspectRatio,
  Avatar,
  Box,
  HStack,
  Image,
  Stack,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import colores from 'assets/theme/colores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Publicacion} from 'interface/publicacion';
import {useNavigation} from '@react-navigation/native';

interface PublicacionesItemProps {
  item: Publicacion;
  acciones: (codigoPublicacionPk: number) => void;
}

const PublicacionesItem: React.FC<PublicacionesItemProps> = ({
  item,
  acciones,
}) => {
  const navigation = useNavigation();
  const [megusta, setMegusta] = useState<boolean>(false);
  const [cantidadMegusta, setCantidadMegusta] = useState<number>(
    item.reacciones,
  );

  const darMegusta = () => {
    if (megusta) {
      setCantidadMegusta(megusta => megusta - 1);
    } else {
      setCantidadMegusta(megusta => megusta + 1);
    }
    setMegusta(!megusta);
  };

  return (
    <Box overflow="hidden">
      <Box>
        <HStack
          p={2}
          justifyContent={'space-between'}
          alignItems={'center'}
          justifyItems={'center'}>
          <HStack space={2} alignItems={'center'}>
            <Avatar
              bg={colores.primary}
              alignSelf="center"
              size="md"
              source={{
                uri: item.usuarioUrlImagen,
              }}
            />
            <Text fontWeight={'bold'}>{item.usuarioNombre}</Text>
          </HStack>
          <TouchableOpacity onPress={() => acciones(item.codigoPublicacionPk)}>
            <Ionicons
              name={'ellipsis-vertical'}
              size={32}
              color={colores.primary}
            />
          </TouchableOpacity>
        </HStack>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: item.urlImagen,
            }}
            alt=""
          />
        </AspectRatio>
      </Box>
      <Stack p="2" space={1}>
        <HStack space={2}>
          <TouchableOpacity onPress={() => darMegusta()}>
            <Ionicons
              name={megusta ? 'heart' : 'heart-outline'}
              size={25}
              color={megusta ? colores.rojo['500'] : colores.primary}
            />
          </TouchableOpacity>
          {item.permiteComentario ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicacionesComentarios', {
                  codigoPublicacionPk: item.codigoPublicacionPk,
                });
              }}>
              <Ionicons
                name={'chatbox-outline'}
                size={25}
                color={colores.primary}
              />
            </TouchableOpacity>
          ) : null}
        </HStack>
        {cantidadMegusta ? (
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="400">
            {cantidadMegusta} Reacciones
          </Text>
        ) : null}
        <HStack space={1}>
          <Text fontWeight="bold">{item.usuarioNombre}</Text>
          <Text fontWeight="400">{item.comentario}</Text>
        </HStack>

        {item.comentarios ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PublicacionesComentarios', {
                codigoPublicacionPk: item.codigoPublicacionPk,
              });
            }}>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              {item.comentarios} Comentarios
            </Text>
          </TouchableOpacity>
        ) : null}
      </Stack>
    </Box>
  );
};

export default PublicacionesItem;
