import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Thumbnail, Header, Tabs, Tab, Text} from 'native-base';
import NewTask from '../Components/NewTask';
import Completed from '../Components/Completed';
import Form from '../Components/Form';

export default class Home extends Component {
  state = {
    active: false,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header hasTabs style={styles.header}>
          <View>
            <Text style={styles.head}>Hello Steve,</Text>
            <Text style={styles.gm}>Good Morning</Text>
          </View>
          <Thumbnail
            source={{
              uri:
                'https://facebook.github.io/react-native/docs/assets/favicon.png',
            }}
          />
        </Header>
        <Tabs tabBarUnderlineStyle={styles.tabs}>
          <Tab
            heading="New Tasks"
            activeTextStyle={{color: 'black', fontWeight: 'bold'}}
            activeTabStyle={styles.tab}
            textStyle={{color: '#eaeaea', fontWeight: 'bold'}}
            tabStyle={styles.tab}>
            <NewTask />
          </Tab>
          <Tab
            heading="Completed"
            activeTextStyle={{color: 'black', fontWeight: 'bold'}}
            activeTabStyle={styles.tab}
            textStyle={{color: '#eaeaea', fontWeight: 'bold'}}
            // textStyle={styles.tabText}
            tabStyle={styles.tab}>
            <Completed />
          </Tab>
        </Tabs>
        <Form />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    justifyContent: 'space-around',
    marginVertical: 30,
    backgroundColor: 'white',
  },
  head: {
    fontSize: 15,
    color: 'grey',
  },
  gm: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  tabs: {
    backgroundColor: '#5189f4',
  },
  tab: {
    backgroundColor: 'white',
  },
});

// export default Home;
