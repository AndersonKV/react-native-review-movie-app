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
import {StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Movie} from './types/types';

declare const global: {HermesInternal: null | {}};

const MovieLiked: React.FC = ({navigation}) => {
  const [movies, setMovie] = React.useState<Movie[]>();

  React.useEffect(() => {
    async function init() {
      const STORAGE_KEY_LIKED = '@liked';

      const getLikedMovie = await AsyncStorage.getItem(STORAGE_KEY_LIKED);
      const getLiked = JSON.parse(getLikedMovie || '[]');

      if (getLiked) {
        setMovie(getLiked);
      }

      navigation.setOptions({
        title: 'Filmes curtidos (' + getLiked.length + ')',
      });
    }
    init();
  }, []);

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{backgroundColor: 'whitesmoke'}}
      data={movies}
      numColumns={3}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          style={styles.container}
          onPress={() => navigation.navigate('Movie', {movieParam: item})}>
          <Image
            style={styles.img}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  MyText: {
    marginLeft: 15,
  },
  img: {
    width: 120,
    height: 150,
  },
});

export default MovieLiked;
