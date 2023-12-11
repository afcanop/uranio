/* eslint-disable react-native/no-inline-styles */
import colores from 'assets/theme/colores';
import {Box, FormControl, Input, Text} from 'native-base';
import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7eaec4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#7eaec4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#7eaec4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4',
};

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [celda, setCelda] = React.useState<String>('');

  const onStepPress = (numero: number) => {
    setCurrentPage(currentPage + numero);
  };

  return (
    <Box padding={2}>
      <StepIndicator
        stepCount={2}
        customStyles={thirdIndicatorStyles}
        currentPosition={currentPage}
        labels={['Celda', 'Código confirmación']}
      />
      {currentPage === 0 ? (
        <Box padding={2}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'md',
                fontWeight: 500,
              }}>
              Número de celda
            </FormControl.Label>
            <Input
              type="text"
              onChangeText={valor => setCelda(valor)}
              autoCapitalize={'none'}
            />
            <FormControl.HelperText
              _text={{
                fontSize: 'lg',
              }}
              borderColor={colores.gris}
              borderWidth="1"
              padding={2}>
              La celda es el número del apartamento, oficina, casa, finca,
              residencia.
            </FormControl.HelperText>
          </FormControl>
          <Box
            marginTop={2}
            borderColor={colores.gris}
            borderWidth="1"
            padding={2}>
            <Text fontSize={'lg'} color={colores.primary}>
              No conoces o no tienes acceso al correo al cual se envió el
              código, escribe una PQRS
            </Text>
          </Box>
          <Box
            marginTop={2}
            borderColor={colores.gris}
            borderWidth="1"
            padding={2}
            alignItems={'center'}>
            <TouchableOpacity>
              <Text fontSize={'lg'} color={colores.primary}>
                Usar Qr
              </Text>
              <Ionicons
                name={'qr-code-outline'}
                size={60}
                color={colores.primary}
              />
            </TouchableOpacity>
          </Box>
          <TouchableOpacity onPress={() => onStepPress(+1)}>
            <Text>Siguiente</Text>
          </TouchableOpacity>
        </Box>
      ) : (
        <Box>
          <Text>{currentPage}</Text>
          <TouchableOpacity onPress={() => onStepPress(-1)}>
            <Text>Siguiente</Text>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: 'red',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: colores.primary,
  },
});
