import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import Router from '@navigation/Router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {configuredStore} from '@store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  useEffect(() => SplashScreen.hide(), []);

  return (
    <SafeAreaProvider>
      <Provider store={configuredStore.store}>
        <PersistGate persistor={configuredStore.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
