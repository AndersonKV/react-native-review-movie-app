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
  Alert,
  TouchableHighlight,
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {CustomModal} from './utils';
import {Movie} from './types/types';

declare const global: {HermesInternal: null | {}};

const Moviecomponent: React.FC = ({navigation, route}) => {
  const [movie, setMovie] = React.useState<Movie>();
  const [isLiked, setLiked] = React.useState(false);
  const [isDisliked, setDisliked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    async function init() {
      if (route.params.movieParam) {
        setMovie(route.params.movieParam);
      }

      const STORAGE_KEY_LIKED = '@liked';

      const STORAGE_KEY_DISLIKED = '@diliked';

      //verifica se tem guardado
      //verifica se tem guardado
      const getLikedMovie = await AsyncStorage.getItem(STORAGE_KEY_LIKED);
      const getLiked = JSON.parse(getLikedMovie || '[]');

      const getDislikedMovie = await AsyncStorage.getItem(STORAGE_KEY_DISLIKED);
      const getDisliked = JSON.parse(getDislikedMovie || '[]');

      console.log(getLiked);

      getLiked.forEach((element) => {
        if (element.id === route.params.movieParam.id) {
          setLiked(true);
        }
      });

      getDisliked.forEach((element) => {
        if (element.id === route.params.movieParam.id) {
          setDisliked(true);
        }
      });
    }
    init();
  });

  async function liked() {
    try {
      const STORAGE_KEY_LIKED = '@liked';

      //verifica se tem guardado
      const getMovieSaved = await AsyncStorage.getItem(STORAGE_KEY_LIKED);

      // let getListMovieInStorage = JSON.parse(getMovieSaved);
      const getListMovieInStorage = JSON.parse(getMovieSaved || '[]');

      const arr: any = [];

      const getNewMovie = route.params.movieParam;

      var checked = false;

      for (let i = 0; i < getListMovieInStorage.length; i++) {
        if (getListMovieInStorage[i].id !== getNewMovie.id) {
          arr.push(getListMovieInStorage[i]);
        } else {
          checked = true;
        }
      }

      if (checked === true) {
        setLiked(false);

        const stringifiedArray = JSON.stringify(arr);
        await AsyncStorage.setItem(STORAGE_KEY_LIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme removido da lista');

        return;
      }

      if (getListMovieInStorage.length === 0) {
        setLiked(true);
        const stringifiedArray = JSON.stringify(Array(getNewMovie));
        await AsyncStorage.setItem(STORAGE_KEY_LIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme adicionado a lista');
      } else {
        setLiked(true);

        const newArr = getListMovieInStorage.concat(getNewMovie);
        const stringifiedArray = JSON.stringify(newArr);
        await AsyncStorage.setItem(STORAGE_KEY_LIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme adicionado a lista');
      }
    } catch (e) {
      Alert.alert('Error', 'Ocorreu um erro durante o processo');
    }
  }

  async function disliked() {
    try {
      const STORAGE_KEY_DISLIKED = '@diliked';

      //verifica se tem guardado
      const getMovieSaved = await AsyncStorage.getItem(STORAGE_KEY_DISLIKED);

      // let getListMovieInStorage = JSON.parse(getMovieSaved);
      const getListMovieInStorage = JSON.parse(getMovieSaved || '[]');

      const arr: any = [];

      const getNewMovie = route.params.movieParam;

      var checked = false;

      for (let i = 0; i < getListMovieInStorage.length; i++) {
        if (getListMovieInStorage[i].id !== getNewMovie.id) {
          arr.push(getListMovieInStorage[i]);
        } else {
          checked = true;
        }
      }

      if (checked === true) {
        setDisliked(false);

        const stringifiedArray = JSON.stringify(arr);
        await AsyncStorage.setItem(STORAGE_KEY_DISLIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme removido da lista');

        return;
      }

      if (getListMovieInStorage.length === 0) {
        setDisliked(true);
        const stringifiedArray = JSON.stringify(Array(getNewMovie));
        await AsyncStorage.setItem(STORAGE_KEY_DISLIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme adicionado a lista');
      } else {
        setDisliked(true);

        const newArr = getListMovieInStorage.concat(getNewMovie);
        const stringifiedArray = JSON.stringify(newArr);
        await AsyncStorage.setItem(STORAGE_KEY_DISLIKED, stringifiedArray);
        Alert.alert('Sucesso', 'Filme adicionado a lista');
      }
    } catch (e) {
      Alert.alert('Error', 'Ocorreu um erro durante o processo');
    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }}
      />

      {isLiked === true ? (
        <View style={styles.isLikedbtnBottom}>
          <FontAwesomeIcon
            style={styles.leftThumb}
            icon={faThumbsUp}
            size={50}
            color="#007bff"
          />
        </View>
      ) : null}

      {isDisliked === true ? (
        <View style={styles.isDilikedbtnBottom}>
          <FontAwesomeIcon
            style={styles.rightThumb}
            icon={faThumbsUp}
            size={50}
            color="red"
          />
        </View>
      ) : null}

      <View style={styles.containerText}>
        <Text style={styles.colorWhite}>{movie?.title}</Text>
        <Text style={styles.textEvaluation}>
          Avaliações({movie?.vote_count})
        </Text>

        <CustomModal
          movie={movie}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />

        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Sinopse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity
          onPress={() => {
            liked();
          }}>
          <View style={styles.btnBottom}>
            <FontAwesomeIcon
              style={styles.leftThumb}
              icon={faThumbsUp}
              size={50}
              color="#007bff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <Text style={styles.MyText}>Voltar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            disliked();
          }}>
          <View style={styles.btnBottom}>
            <FontAwesomeIcon
              style={styles.rightThumb}
              icon={faThumbsUp}
              size={50}
              color="red"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FF1493',
    flex: 1,
  },
  containerBottom: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingTop: 30,
  },
  containerText: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
  },
  textEvaluation: {
    fontSize: 20,
    color: 'white',
    top: 30,
    alignSelf: 'flex-end',
    backgroundColor: 'black',
  },
  sinopse: {
    color: 'red',
    fontSize: 25,
    backgroundColor: 'black',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    top: 30,
  },
  colorWhite: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'black',
    top: 30,
  },
  leftThumb: {
    transform: [{scaleX: -1}],
  },
  rightThumb: {
    transform: [{scale: -1}],
    rotation: 180,
  },
  isLikedbtnBottom: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    top: '70%',
    opacity: 0.5,
    right: '60%',
    position: 'absolute',
  },
  isDilikedbtnBottom: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    top: '70%',
    opacity: 0.5,
    left: '60%',
    position: 'absolute',
  },
  btnBottom: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    top: -15,
  },
  MyText: {
    padding: 20,
    fontSize: 30,
    borderRadius: 50,
    color: 'gray',
    backgroundColor: 'white',
    top: -15,
  },
  img: {
    width: '90%',
    height: '80%',
    backgroundColor: 'black',
    position: 'absolute',
    top: 30,
  },
  BackgroundWhite: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    color: 'red',
    fontSize: 25,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    top: 30,
  },
  textStyle: {
    color: 'red',
    fontSize: 25,
    backgroundColor: 'black',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Moviecomponent;
