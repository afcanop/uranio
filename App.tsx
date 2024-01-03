import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/screen';
import {persistor, store} from './src/store';
import {CustomTheme} from './src/assets/theme';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={CustomTheme}>
          <AppNavigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
