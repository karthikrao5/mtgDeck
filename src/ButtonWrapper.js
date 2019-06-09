// @flow
import React from "react";
import {Button} from 'react-native';

type Props = {
  id: number,
  title: string,
  onPress: (event: any, id: number) => void
}

export const ButtonWrapper = (props: Props) => {
  const onPress = (event) => {
    props.onPress(event, props.id);
  };

  return (
    <Button title={props.title}
            onPress={onPress}/>
  )
};
