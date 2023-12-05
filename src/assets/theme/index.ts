import {extendTheme} from 'native-base';
import colores from './colores';

export const CustomTheme = extendTheme({
  colores: {
    primary: colores.base,
    info: colores.azul,
    danger: colores.rojo,
    success: colores.verde,
    yellow: colores.amarillo,
  },
  fonts: {
    heading: 'Rubik-Regular',
    body: 'Rubik-Regular',
    mono: 'Rubik-Regular',
  },
  components: {
    Input: {
      defaultProps: {
        _focus: {
          borderColor: colores.primary,
        },
      },
    },
    Link: {
      defaultProps: {
        _text: {
          color:  colores.primary,
        },
      },
    },
  },
});
