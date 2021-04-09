/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Thumbnail,
  Fab,
  Header,
  Tabs,
  Tab,
  Text,
  Icon,
  Button,
} from 'native-base';
import NewTask from '../Components/NewTask';

export default class Home extends Component {
  render() {
    return (
      <Container style={styles.Container}>
        <Header hasTabs style={styles.Header}>
          <Text>Hello Steve Good Morning</Text>
          <Thumbnail
            source={{
              uri:
                'https://facebook.github.io/react-native/docs/assets/favicon.png',
            }}
          />
        </Header>
        <Tabs tabBarUnderlineStyle={styles.tabs}>
          <Tab
            activeTextStyle={styles.tabText}
            activeTabStyle={styles.tab}
            heading="New Task">
            <NewTask />
          </Tab>
          <Tab
            heading="Completed"
            textStyle={styles.tabText}
            tabStyle={styles.tab}>
            <NewTask />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
  tabs: {
    backgroundColor: 'blue',
  },
  tab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'black',
  },
  Header: {
    marginTop: 15,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
});

// export default Home;
