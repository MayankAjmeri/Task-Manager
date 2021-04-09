/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, Pressable, View} from 'react-native';

class Form extends Component {
  state = {
    title: 'empty',
    description: 'empty',
  };

  async send() {
    console.log('pressed');
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
    console.log('pres', response);
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Title</Text>
          <TextInput
            style={styles.title}
            onChangeText={title => this.setState({title: title})}
            value={this.state.text}
            placeholder="Title"
            placeholderTextColor="grey"
          />
          <Text>Description</Text>
          <TextInput
            style={[styles.title, styles.description]}
            onChangeText={desc => this.setState({description: desc})}
            value={this.state.description}
            placeholder="Description"
            placeholderTextColor="grey"
            multiline={true}
          />
          <Pressable style={styles.buttonClose} onPress={() => this.send()}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    height: 40,
    width: 200,
    margin: 15,
    borderWidth: 1,
    color: 'black',
  },
  description: {
    height: 150,
  },
});

export default Form;
