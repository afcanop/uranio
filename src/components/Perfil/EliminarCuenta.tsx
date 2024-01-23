import {Pressable} from 'react-native';
import React from 'react';
import Contenedor from 'common/Contenedor';
import {Box, HStack, Heading, Stack, Text, VStack} from 'native-base';
import colores from 'assets/theme/colores';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EliminarCuenta = () => {
  const navigation = useNavigation();

  return (
    <Contenedor>
      <VStack space={'2'}>
        <Heading>¿Eliminar o desactivar?</Heading>
        <Text>
          Si quiere abandonar Vecci de forma temporal o eliminar la cuenta.
        </Text>
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor={colores.amarillo['500']}
          backgroundColor={colores.amarillo['50']}
          borderWidth="1">
          <Box>
            <Pressable
              onPress={() => navigation.navigate('EliminarCuenta')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? colores.amarillo['100']
                    : 'transparent',
                },
              ]}>
              <Stack p="3" space={2}>
                <HStack space={2} justifyContent={'space-between'}>
                  <Box flex={1}>
                    <Heading size="md" color={colores.amarillo['600']}>
                      ¿Desactivar cuanta?
                    </Heading>
                    <Text color={colores.amarillo['600']}>
                      No resiviraer notifcaciones, podras reactivar tu cuenta en
                      cualquier momento
                    </Text>
                  </Box>
                  <Ionicons
                    name={'information'}
                    size={30}
                    color={colores.amarillo['600']}
                  />
                </HStack>
              </Stack>
            </Pressable>
          </Box>
        </Box>
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor={colores.rojo['500']}
          backgroundColor={colores.rojo['50']}
          borderWidth="1">
          <Pressable
            onPress={() => navigation.navigate('EliminarCuenta')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? colores.rojo['100'] : 'transparent',
              },
            ]}>
            <Stack p="3" space={2}>
              <HStack space={2} justifyContent={'space-between'}>
                <Box>
                  <Heading size="md" color={colores.rojo['600']}>
                    Eliminar cuanta
                  </Heading>
                  <Text color={colores.rojo['600']}>
                    Tu cuenta se eliminara de forma irreversible.
                  </Text>
                </Box>
                <Ionicons
                  name={'alert'}
                  size={30}
                  color={colores.rojo['600']}
                />
              </HStack>
            </Stack>
          </Pressable>
        </Box>
      </VStack>
    </Contenedor>
  );
};

export default EliminarCuenta;
