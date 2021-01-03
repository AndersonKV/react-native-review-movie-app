import React from 'react';
import {TouchableHighlight, View, Text, Modal} from 'react-native';

import {styles} from './movie';

export const CustomModal = ({movie, setModalVisible, modalVisible}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{movie?.overview}</Text>

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={{fontSize: 30}}>X</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};
