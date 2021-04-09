/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Card, CardItem, Thumbnail, Button} from 'native-base';

export default class NewTask extends Component {
  state = {
    tasks: [],
    fetched: false,
    // description: '',
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
        // console.log(responseJson.data.tasks.length);
        console.log(this.state);
      });
    //   .catch(error => console.log(error)); //to catch the errors if any
  }

  render() {
    const fetched = this.state.fetched;
    let desc;
    let length = this.state.tasks.length;
    let time;
    if (fetched) {
      for (let i = 0; i < length; i++) {
        time = new Date(this.state.tasks[i].createdAt);
        desc = (
          <View style={styles.Card}>
            <View style={styles.cardDetails}>
              <Text>{this.state.tasks[i].title}</Text>
              {/* <Thumbnail source={{uri: this.state.tasks[i].avatars}} /> */}
              <Text>{this.state.tasks[i].description}</Text>
              <Text>
                created: {time.toDateString()} at {time.toLocaleTimeString()}
              </Text>
            </View>
          </View>
        );
      }
    } else {
      desc = <Text>hello</Text>;
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
    marginTop: 15,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  Card: {
    width: '100%',
    height: '30%',
    elevation: 2,
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

// export default Home;
