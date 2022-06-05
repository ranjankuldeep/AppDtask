/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Welcome from './Screens/Welcome';
import EntryScreen from './Screens/Addentry';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import ProductsContextProvider from './Screens/Store/ProductsContext';

const Stack = createNativeStackNavigator();
const App = () => {
  const [ids, updateids] = React.useState([]);
  const receivedata = data => {
    updateids(prev => [...prev, data]);
  };
  console.log(ids);
  return (
    <>
      <ProductsContextProvider>
        <View style={styles.sectionContainer}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen
                name="EntryScreen"
                component={EntryScreen}
                options={{receive: receivedata}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ProductsContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});

export default App;
