import Navigator from  './app/navigator/navigator';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { ToneContext } from './app/ToneModule/ToneContext';
import { useState } from 'react';
import { ToneModule } from './app/ToneModule/ToneModule';

export default function App() {
  const [tone, setTone] = useState(()=>ToneModule());
  return (
    <ToneContext.Provider value={tone}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ToneContext.Provider>
  )
}