import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import screens
import HomeScreen from './screens/HomeScreen';
import CarbohydrateScreen from './screens/Nutrients/CarbohydrateScreen';
import ProteinScreen from './screens/Nutrients/ProteinScreen';
import FatScreen from './screens/Nutrients/FatScreen';
import CalculatorScreen from './screens/CalculatorScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NutrientHeaderTabs() {
  const navigation = useNavigation();
  return (
    <View style={headerTabStyles.row}>
      <TouchableOpacity style={headerTabStyles.left} onPress={() => navigation.navigate('Carbohydrate')}>
        <Text style={headerTabStyles.text}>Carbohydrate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={headerTabStyles.center} onPress={() => navigation.navigate('Protein')}>
        <Text style={headerTabStyles.text}>Protein</Text>
      </TouchableOpacity>
      <TouchableOpacity style={headerTabStyles.right} onPress={() => navigation.navigate('Fat')}>
        <Text style={headerTabStyles.text}>Fat</Text>
      </TouchableOpacity>
    </View>
  );
}

const headerTabStyles = StyleSheet.create({
  row: { flexDirection: 'row', width: 350, justifyContent: 'space-between' },
  left: { flex: 1, alignItems: 'center' },
  center: { flex: 1, alignItems: 'center' },
  right: { flex: 1, alignItems: 'center' },
  text: { fontSize: 16, fontWeight: 'bold', color: '#1fb28a' },
});

function NutrientsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="Carbohydrate"
        component={CarbohydrateScreen}
        options={{
          headerTitle: () => <NutrientHeaderTabs />,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Protein"
        component={ProteinScreen}
        options={{
          headerTitle: () => <NutrientHeaderTabs />,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Fat"
        component={FatScreen}
        options={{
          headerTitle: () => <NutrientHeaderTabs />,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor: '#1fb28a',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: '#1fb28a' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Drawer.Screen name="Nutrients" component={NutrientsStack} options={{ title: 'Nutrients' }} />
        <Drawer.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculator' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
