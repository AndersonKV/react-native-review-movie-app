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
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {Movie} from './types/types';

declare const global: {HermesInternal: null | {}};

const Sobre: React.FC = ({navigation, route}) => {
  const [movies, setMovie] = React.useState<Movie[]>();
  const [not, setNot] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function init() {
      const API_KEY = '8c6791c6ea9891f29fc5aa707f18e4c8';
      const namedMovie = route.params.search;

      console.log(route.params.search);
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${namedMovie}`,
        );
        let data = await response.json(); // read response body as text

        if (data.results) {
          setMovie(data.results);
        } else {
          setNot(true);
        }
        setLoading(true);
      } catch (err) {
        setLoading(true);
        setNot(true);
        console.log(err);
      }
    }
    init();
  }, [route.params.search]);

  return loading === true ? (
    not !== true ? (
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={{backgroundColor: 'white'}}
        data={movies}
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
            <Text style={styles.MyText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    ) : (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30}}>Nada foi encontrado ;(</Text>
        <Button
          onPress={() => navigation.goBack()}
          title="voltar"
          color="#0597db"
          accessibilityLabel="Voltar para pagina anterior"
        />
      </View>
    )
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    margin: 4,
  },
  MyText: {
    marginLeft: 15,
  },
  img: {
    width: 66,
    height: 58,
  },
});

export default Sobre;
