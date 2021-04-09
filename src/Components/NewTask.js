/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Pressable, Modal, Button} from 'react-native';
import {Container} from 'native-base';

export default class NewTask extends Component {
  state = {
    tasks: [],
    fetched: false,
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  componentDidMount() {
    fetch('https://dermasync.herokuapp.com/api/tasks')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          tasks: responseJson.data.tasks,
          fetched: true,
        });
        console.log(responseJson.data);
        console.log(this.state);
      });
    //   .catch(error => console.log(error)); //to catch the errors if any
  }

  complete(id) {
    const response = fetch('https://dermasync.herokuapp.com/api/task/' + id, {
      method: 'POST',
    });
    console.log('pres', response);
  }

  list() {}

  render() {
    const {modalVisible} = this.state.modalVisible;
    const fetched = this.state.fetched;
    let desc = [];
    let length = this.state.tasks.length;
    console.log(length);
    let time;
    if (fetched) {
      for (let i = 0; i < length; i++) {
        if (this.state.tasks[i].title == null) {
          continue;
        }
        console.log('not continued');
        time = new Date(this.state.tasks[i].createdAt);
        desc.push(
          <Pressable
            style={styles.Card}
            onPress={() => {
              console.log('card');
              this.setModalVisible(true);
            }}>
            <View style={styles.cardDetails}>
              <Text>{this.state.tasks[i].title}</Text>
              <Text>{this.state.tasks[i].description}</Text>
              <Text>
                Created: {time.toDateString()} at {time.toLocaleTimeString()}
              </Text>
            </View>
          </Pressable>,
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Button
                  style={styles.buttonClose}
                  title="Cancel"
                  onPress={() => this.send()}
                />
                <Button
                  title="Completed"
                  style={styles.buttonClose}
                  onPress={() => this.send()}
                />
              </View>
            </View>
          </Modal>,
        );
      }
    }
    return (
      <Container style={styles.Header}>
        {this.state.fetched ? desc : <Text>Fetching Data</Text>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    marginVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  Card: {
    width: '100%',
    height: '30%',
    elevation: 2,
    margin: 15,
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderColor: 'green',
    borderRadius: 10,
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
});
