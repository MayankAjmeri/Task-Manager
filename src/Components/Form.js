import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  View,
  Modal,
} from 'react-native';
import {Icon, Fab} from 'native-base';
class Form extends Component {
  state = {
    title: '',
    description: '',
    submitted: false,
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  async send() {
    const response = await fetch('https://dermasync.herokuapp.com/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
    });
    this.setState({submitted: true});
  }

  render() {
    const modalVisible = this.state.modalVisible;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.align}>
            <View style={styles.modalView}>
              <Text style={styles.newTask}>Create a task</Text>
              <Text style={styles.form}>Title</Text>
              <TextInput
                style={styles.title}
                onChangeText={title => this.setState({title: title})}
                placeholder="Title"
                placeholderTextColor="grey"
              />
              <Text style={styles.form}>Description</Text>
              <TextInput
                style={[styles.title, styles.description]}
                onChangeText={desc => this.setState({description: desc})}
                placeholder="Description"
                placeholderTextColor="grey"
                multiline={true}
              />
              <Pressable
                style={styles.submit}
                onPress={() => {
                  this.send();
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Fab
          style={[styles.openForm]}
          onPress={() => this.setModalVisible(true)}>
          <Icon color="white" name="plus" type="AntDesign" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  align: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 10,
  },
  newTask: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  title: {
    height: 40,
    width: 200,
    margin: 15,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
  },
  description: {
    height: 150,
  },
  submit: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 15,
    width: 200,
    elevation: 2,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  openForm: {
    backgroundColor: '#5189f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    color: 'white',
    margin: 30,
    elevation: 2,
    alignSelf: 'flex-end',
  },
});

export default Form;
