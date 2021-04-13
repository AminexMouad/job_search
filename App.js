import React from 'react';
import {Provider} from 'react-redux';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import store from './store';
import DetailScreen from './src/screens/DetailScreen';
import APIProvider from './src/api/APIProvider';
const Stack = createStackNavigator();

const App = () => {
  return (
    <APIProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: '#06022f'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: responsiveFontSize(1.7),
              },
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Job Finder'}}
            />
            <Stack.Screen
              name="Detail"
              options={({route}) => ({title: route.params.title})}
              component={DetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </APIProvider>
  );
};

export default App;
