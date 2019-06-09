import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import DeckViewPage from "./src/DeckViewPage";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import CardCarousel from "./src/CardCarousel";
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from "./src/store/store";
import DeckListPage from "./src/DeckListPage";

type Props = {};

const navigator = createSwitchNavigator({
  DeckView: {
    screen: DeckListPage
  },
  DeckList: {
    screen: DeckViewPage
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
        <PersistGate persistor={persistor} loading={null}>
          <View style={styles.container}>
            <NavContainer/>
          </View>
        </PersistGate>
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
