import React, {ReactNode} from 'react';
import {Button, Center, Heading, Text} from 'native-base';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';
import ContenedorAnimado from './ContendorAnimado';
import Contenedor from './Contenedor';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ContenedorProps {
  children: ReactNode;
}

const ValidarCelda: React.FC<ContenedorProps> = ({children}) => {
  const celdaId = useSelector((state: RootState) => state.usuario.celdaId);
  const navigation = useNavigation();

  return (
    <>
      {celdaId === null ? (
        <Contenedor>
          <ContenedorAnimado>
            <Heading mb={4}>¡Oh, estás sin una celda asignada!</Heading>
            <Text>
              Para poder acceder a esta información, por favor completa él
              proceso de asignar celda.
            </Text>
            <Button my="2" onPress={() => navigation.navigate('ConectarCelda')}>
              Completar
            </Button>
          </ContenedorAnimado>
          <ContenedorAnimado delay={200}>
            <Center>
              <Image
                style={{width: 128, height: 128}}
                source={require('../assets/img/cuestionario.png')}
              />
            </Center>
            <Text>
              Queremos asegurarnos de que tu experiencia sea lo más
              satisfactoria posible. Si en algún momento tienes preguntas,
              inquietudes o simplemente deseas obtener más información, no dudes
              en contactarnos a través de nuestro sistema de PQRS (Preguntas,
              Quejas, Reclamos y Sugerencias).
            </Text>
            <Button
              onPress={() =>
                navigation.navigate('PQRS', {
                  screen: 'preguntas',
                  initial: false,
                })
              }
              variant="link">
              Escríbenos
            </Button>
          </ContenedorAnimado>
        </Contenedor>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ValidarCelda;
