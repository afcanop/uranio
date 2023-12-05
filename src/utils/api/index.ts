import Axios, {AxiosResponse} from 'axios';

const URL_BASE = 'http://localhost/public/index.php/';

interface Configuracion {
  method?: 'get' | 'post' | 'put' | 'delete';
  aplicarUrlBase?: boolean;
}

export const consultarApi = async <T>(
  urlConsulta: string,
  data: any,
  configuracion: Configuracion = {
    method: 'post',
    aplicarUrlBase: true,
  },
): Promise<T> => {
  let url = '';

  if (configuracion.aplicarUrlBase) {
    url = URL_BASE + urlConsulta;
  } else {
    url = urlConsulta;
  }

  const informacionConsulta: AxiosResponse<T> = await Axios({
    method: configuracion.method,
    url,
    data,
  });

  return informacionConsulta.data;
};
