import {Dimensions, StyleSheet} from 'react-native';
import colores from '../theme/colores';
const windowHeight = Dimensions.get('window').height;

const HojaDeEstiloGenerales = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colores.blanco,
    borderColor: colores.blanco,
    marginVertical: 5,
    marginHorizontal: 2,
    padding: 10,
    shadowColor: colores.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  headerTitle: {
    color: colores.blanco,
    fontSize: 20,
    paddingLeft: 8,
    fontFamily: 'Rubik-Regular',
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: colores.blanco,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    elevation: 12,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
    minHeight: windowHeight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginHorizontal: 15,
    marginVertical: 15,
    marginTop: 30,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colores.blanco,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 4,
    borderRadius: 10,
    elevation: 1,
    padding: 10,
  },
  textoGeneralBold: {
    fontFamily: 'Rubik-Bold',
    color: colores.negro,
    fontWeight: 'bold'
  },
  textoGeneral: {
    fontSize: 11.5,
    fontFamily: 'Rubik-Regular',
    color: colores.negro,
  },
});

export default HojaDeEstiloGenerales;
