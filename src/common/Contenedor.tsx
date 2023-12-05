import React, {ReactNode} from 'react';
import {Box} from 'native-base';

interface ContenedorProps {
  children: ReactNode;
}

const Contenedor: React.FC<ContenedorProps> = ({children}) => {
  return (
    <Box flex={1} p="2" w="100%" mx="auto" background={'white'}>
      {children}
    </Box>
  );
};

export default Contenedor;
