import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigator';


export default function App() {
  return (
    <NavigationContainer> 
      <AppNavigation />
    </NavigationContainer>
  );
}

