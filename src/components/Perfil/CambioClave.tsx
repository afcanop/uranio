import React, {useState} from 'react';
import {Box, Button, FormControl, Input, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CambioClave = () => {
  const [clave, setClave] = useState<String>('');
  const [confirmarClave, setConfirmarClave] = useState<String>('');
  const [mostrarClave, setMostrarClave] = useState<boolean>(false);
  const [mostrarConfirmarClave, setMostrarConfirmarClave] =
    useState<boolean>(false);

  return (
    <Box flex={1} padding={2}>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nueva clave</FormControl.Label>
          <Input
            type={mostrarClave ? 'text' : 'password'}
            onChangeText={(valor: string) => setClave(valor)}
            InputRightElement={
              <TouchableOpacity
                onPress={() => setMostrarClave(!mostrarClave)}
                style={{marginHorizontal: 5}}>
                {mostrarClave == false ? (
                  <Ionicons name={'eye-off-outline'} size={25} />
                ) : (
                  <Ionicons
                    name={'eye-outline'}
                    size={25}
                    color={'coolGray.800'}
                  />
                )}
              </TouchableOpacity>
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirmar clave </FormControl.Label>
          <Input
            type={mostrarClave ? 'text' : 'password'}
            onChangeText={(valor: string) => setConfirmarClave(valor)}
            InputRightElement={
              <TouchableOpacity
                onPress={() => setMostrarConfirmarClave(!mostrarConfirmarClave)}
                style={{marginHorizontal: 5}}>
                {mostrarClave === false ? (
                  <Ionicons name={'eye-off-outline'} size={25} />
                ) : (
                  <Ionicons
                    name={'eye-outline'}
                    size={25}
                    color={'coolGray.800'}
                  />
                )}
              </TouchableOpacity>
            }
          />
        </FormControl>
        <Button mt="2">Confirmar</Button>
      </VStack>
    </Box>
  );
};

export default CambioClave;
