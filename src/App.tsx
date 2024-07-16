import React, { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';
import Router from '@navigation/Router';

function App(): React.JSX.Element {
  useEffect(() => SplashScreen.hide(), []);

  return (
    <Router />
  );
}

export default App;
