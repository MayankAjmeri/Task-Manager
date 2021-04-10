import React, {Component} from 'react';
import {Pressable, View, Text, Modal, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export default class Task extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  complete(id) {
    const response = fetch('https://dermasync.herokuapp.com/api/task/' + id, {
      method: 'POST',
    });
  }

  render() {
    const modalVisible = this.state.modalVisible;
    let time = new Date(this.props.tasks.createdAt);

    return (
      <View>
        <Pressable
          style={[
            this.props.tasks.completed
              ? {borderLeftColor: '#47c568'}
              : {borderLeftColor: '#fc6e6e'},
            styles.Card,
          ]}
          // style={styles.Card}
          onPress={() => {
            !this.props.tasks.completed
              ? this.setModalVisible(true)
              : this.setModalVisible(false);
          }}>
          <View style={styles.cardDetails}>
            <Text
              style={[
                this.props.tasks.completed
                  ? {color: '#47c568'}
                  : {color: '#fc6e6e'},
                styles.title,
              ]}>
              {this.props.tasks.title}
            </Text>
            <Text style={styles.description}>
              {this.props.tasks.description}
            </Text>
            <View
              style={{
                borderBottomColor: '#eaeaea',
                borderBottomWidth: 2,
              }}
            />
            <Text style={styles.time}>
              <Icon
                name="clockcircleo"
                type="AntDesign"
                style={{fontSize: 15}}
              />
              {'   '}
              {time.toLocaleTimeString()}
            </Text>
            <Text style={styles.time}>
              <Icon name="calendar" type="AntDesign" style={{fontSize: 15}} />
              {'   '}
              {time.toDateString()}
            </Text>
          </View>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.align}>
            <View style={styles.confirmBox}>
              <Text style={styles.confirmText}>
                {' '}
                Mark "{this.props.tasks.title}" as complete?
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.confirmButton, styles.cancel]}
                  title="Cancel"
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => {
                    this.complete(this.props.tasks.id);
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Text>Completed</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    width: '100%',
    // height: 120,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderWidth: 2,
    borderEndColor: '#eaeaea',
    borderBottomColor: '#eaeaea',
    borderTopColor: '#eaeaea',
    borderRadius: 10,
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: 'black',
    marginBottom: 20,
  },
  time: {
    marginTop: 10,
    justifyContent: 'center',
    fontSize: 12,
  },

  align: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  confirmBox: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 12,
    // padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  confirmText: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    width: 100,
    alignItems: 'center',
    margin: 10,
    marginBottom: 20,
  },
  cancel: {
    backgroundColor: '#ebebeb',
  },
});
