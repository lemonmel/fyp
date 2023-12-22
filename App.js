import Navigator from  './app/navigator/navigator';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}
