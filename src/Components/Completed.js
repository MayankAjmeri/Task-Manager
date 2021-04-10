import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Task from './Task';
export default class NewTask extends Component {
  state = {
    tasks: [],
    fetched: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getData() {
    fetch('https://dermasync.herokuapp.com/api/tasks?completed=1')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          tasks: responseJson.data.tasks,
          fetched: true,
        });
      });
    //   .catch(error => console.log(error)); //to catch the errors if any
  }

  render() {
    const fetched = this.state.fetched;
    let desc = [];
    let length = this.state.tasks.length;
    if (fetched) {
      for (let i = 0; i < length; i++) {
        if (this.state.tasks[i].title == null) {
          continue;
        }
        desc.push(<Task tasks={this.state.tasks[i]} />);
      }
    }
    return <ScrollView style={styles.list}>{desc}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  list: {
    overflow: 'scroll',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
