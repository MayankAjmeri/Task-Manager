/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Modal, StyleSheet, Pressable, View} from 'react-native';
import {Icon} from 'native-base';
import Form from './Form';

class modal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Form />
        </Modal>
        <Pressable
          style={[styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <Icon color="white" name="plus" type="AntDesign" />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonOpen: {
    backgroundColor: '#4285F4',
    borderRadius: 50,
    padding: 17,
    color: 'white',
    margin: 30,
    elevation: 2,
    alignSelf: 'flex-end',
  },
});

export default modal;
