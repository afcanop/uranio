import React, {ReactNode} from 'react';
import {HStack, Heading, Spinner} from 'native-base';
import colores from 'assets/theme/colores';

interface SpinnerAuxiliarProps {
  mostrarSpinner: boolean;
  children: ReactNode;
}

const SpinerAuxiliar: React.FC<SpinnerAuxiliarProps> = ({
  mostrarSpinner,
  children,
}) => {
  return (
    <>
      {mostrarSpinner ? (
        <HStack space={2} justifyContent="center">
          <Spinner color={colores.primary} size="lg" />
          <Heading color="primary.500" fontSize="md">
            Cargando
          </Heading>
        </HStack>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default SpinerAuxiliar;
