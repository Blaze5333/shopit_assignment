
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store,persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { useEffect, useState } from 'react';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3100);
  }, []);
  return (
    <>
    <StatusBar
           barStyle="light-content"
           backgroundColor="transparent"
           translucent
         />
             <AnimatedSplash
               translucent={true}
               isLoaded={loaded}
               // logoImage={require('./src/assets/logos/logo.png')}
               imageBackgroundSource={require('./src/assets/images/splash-screen.png')}
               logoHeight={0.1}
               logoWidth={0.1}
             >
             <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
             <Navigation />
           </PersistGate>
         </Provider>
    </AnimatedSplash>
       </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
