import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import StartScreen from './Components/StartScreen';
import PhoneNumberScreen from './Components/PhoneNumberScreen';
import OTPScreen from './Components/OTPScreen';
import SpecialityScreen from './Components/SpecialityScreen';
import BrandNameScreen from './Components/BrandNameScreen';
import BrandIdentityScreen from './Components/BrandIdentityScreen';
import DiagnosisScreen from './Components/DiagnosisScreen';
import MedicineScreen from './Components/MedicineScreen';

const Stack = createStackNavigator();

const App = () => {
  // const [progress, setProgress] = useState(0);  // Track progress (0 = gray, 1 = blue)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneNumber"
          component={PhoneNumberScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Speciality"
          component={SpecialityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BrandName"
          component={BrandNameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BrandIdentity"
          component={BrandIdentityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Diagnosis"
          component={DiagnosisScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medicine"
          component={MedicineScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
