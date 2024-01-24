import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import colores from 'assets/theme/colores';
import {useSelector} from 'react-redux';
import {RootState} from 'store/reducers';

interface IconoNavegacionProps {
  icon: string;
  ruta: string;
}

const IconoNavegacion: React.FC<IconoNavegacionProps> = ({icon, ruta}) => {
  const navigation = useNavigation();
  const celdaId = useSelector((state: RootState) => state.usuario.celdaId);

  return (
    <>
      {celdaId ? (
        <TouchableOpacity onPress={() => navigation.navigate(ruta)}>
          <Ionicons name={icon} size={30} color={colores.blanco} />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default IconoNavegacion;
