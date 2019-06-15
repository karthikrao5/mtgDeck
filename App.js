import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import CardCarousel from "./src/CardCarousel";
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from "./src/store/store";
import DeckListPage from "./src/pages/DeckListPage";
import DeckViewPage from "./src/pages/DeckViewPage";
import AddDeckPage from "./src/pages/AddDeckPage";
import {HomePage} from "./src/pages/HomePage";

type Props = {};

const stackNav = createStackNavigator({
  Home: HomePage,
  AddDeckPage: {
    screen: AddDeckPage
  },
  // DeckList: {
  //   screen: DeckListPage
  // },
  // Carousel: {
  //   screen: CardCarousel
  // },
  // DeckView: {
  //   screen: DeckViewPage
  // }
}, {initialRouteName: 'AddDeckPage'});

const NavContainer = createAppContainer(stackNav);

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavContainer/>
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
