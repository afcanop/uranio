import React from 'react';
import {Box, VStack, Text, Button} from 'react-native';

const MensajeSinPermisoCamara = ({consultarPermisoCamara}) => {
  return (
    <Box flex={1} padding={2}>
      <VStack space={3} mt="5">
        <Text>
          Veeci no tiene permiso a la cámara del dispositivo, por favor intentar
          solicitar permiso.
        </Text>
        <Button onPress={() => consultarPermisoCamara()}>Ingresar</Button>
      </VStack>
    </Box>
  );
};

export default MensajeSinPermisoCamara;
