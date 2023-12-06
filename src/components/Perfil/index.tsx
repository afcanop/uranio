import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Box, HStack, Heading, Image, Stack, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const index = () => {

  const navigation = useNavigation();



  return (
    <>
      <Box margin={2} alignItems={'center'} justifyContent={'center'}>
        <Avatar bg="cyan.500" size={'2xl'} source={{
        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }}>
          TE
        </Avatar>
        <TouchableOpacity>
          <Text>Cambiar foto del perfil</Text>
        </TouchableOpacity>
      </Box>
      <Box margin={2} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Datos personales
              </Heading>
              <TouchableOpacity
                onPress={() => navigation.navigate('InformacionPersonal')}
              >
                <Ionicons
                  name={'pencil'}
                  size={25}
                />
              </TouchableOpacity>
            </HStack>
            <Text fontWeight="400">
              Código:
            </Text>
            <Text fontWeight="400">
              Usuario:
            </Text>
            <Text fontWeight="400">
              Celular:
            </Text>
          </Stack>
        </Box>
      </Box>
      <Box margin={2} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Panel y celda
              </Heading>
              <TouchableOpacity>
                <Text>Desvincular</Text>
              </TouchableOpacity>
            </HStack>

            <Text fontWeight="400">
              Ciudad:
            </Text>
            <Text fontWeight="400">
              Panel:
            </Text>
            <Text fontWeight="400">
              Celda:
            </Text>
          </Stack>
        </Box>
      </Box>
      <Box margin={2} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
        <Box>
          <Stack p="4" space={3}>
            <HStack space={2} justifyContent={'space-between'}>
              <Heading size="md" ml="-1">
                Seguridad
              </Heading>
              <TouchableOpacity
                onPress={() => navigation.navigate('CambioClave')}

              >
                <Ionicons
                  name={'pencil'}
                  size={25}
                />
              </TouchableOpacity>
            </HStack>
            <Text fontWeight="400">
              Cambiar clave
            </Text>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default index

const styles = StyleSheet.create({})