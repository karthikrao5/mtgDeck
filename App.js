import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import DeckListPage from "./src/DeckListPage";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import CardCarousel from "./src/CardCarousel";

type Props = {};

const navigator = createSwitchNavigator({
  DeckList: {
    screen: DeckListPage
  },
  Carousel: {
    screen: CardCarousel
  }
});

const NavContainer = createAppContainer(navigator);

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
