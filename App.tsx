/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

import Home from './Pages/home';
import Search from './Pages/search';
import Movie from './Pages/movie';
import MovieLiked from './Pages/movieLiked';
import MovieDisliked from './Pages/movieDisliked';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Movie" component={Movie} />
        <Stack.Screen
          name="MovieLiked"
          component={MovieLiked}
          options={{title: 'Filmes curtidos'}}
        />
        <Stack.Screen
          name="MovieDisliked"
          component={MovieDisliked}
          options={{title: 'Filmes não curtidos'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
