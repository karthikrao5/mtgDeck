import Carousel from 'react-native-snap-carousel';
import React from "react";
import {Text, View, StyleSheet} from 'react-native';

export class CardCarousel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      entries: [
        {
          title: "Some title"
        },
        {
          title: "Some other title"
        },
        {
          title: "another title"
        }
      ]
    }
  }


  static renderItem({item, index}) {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={CardCarousel.renderItem}
          sliderWidth={200}
          itemWidth={100}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
});