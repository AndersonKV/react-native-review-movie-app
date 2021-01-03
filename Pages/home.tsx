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
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {faSearch, faFilm} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import {sub} from 'react-native-reanimated';

declare const global: {HermesInternal: null | {}};

const Home: React.FC = ({navigation}) => {
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    async function init() {
      //const restoredArray = JSON.parse(userAge);
      //AsyncStorage.clear();
    }
    init();
  }, []);

  const submitHandler = () => {
    if (search.length !== 0) {
      navigation.navigate('Search', {
        search: search,
      });
    } else {
      Alert.alert('Problema', 'Necessario pelo menos uma letra');
    }
  };

  const changeHandler = (val: string) => {
    setSearch(val);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#FF0099', '#493240']}
        style={styles.linearGradient}>
        <FontAwesomeIcon
          style={{marginBottom: 80}}
          icon={faFilm}
          size={80}
          color="black"
        />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="digite o nome do filme..."
            placeholderTextColor="black"
            backgroundColor="white"
            onChangeText={changeHandler}
          />
          <TouchableOpacity style={styles.iconSearch} onPress={submitHandler}>
            <FontAwesomeIcon icon={faSearch} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerBottom}>
          <TouchableOpacity onPress={() => navigation.navigate('MovieLiked')}>
            <View>
              <Text
                style={{
                  ...styles.textBtn,
                  backgroundColor: 'green',
                  color: 'white',
                }}>
                Filmes curtidos
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDisliked')}>
            <View>
              <Text
                style={{
                  ...styles.textBtn,
                  backgroundColor: 'red',
                  color: 'white',
                }}>
                Filmes não curtidos
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  input: {
    padding: 20,
    flex: 10,
  },
  iconSearch: {
    flex: 1,
    backgroundColor: 'white',
    padding: 21,
    borderWidth: 1,
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'black',
  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBtn: {
    fontSize: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 100,
  },
});

export default Home;
