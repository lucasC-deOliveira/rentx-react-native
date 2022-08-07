import React from 'react';
import { Button, Dimensions, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import {
  Container,
} from './styles'

const WIDTH= Dimensions.get("window").width;

export function Splash() {

  const animation = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }]
    }
  })

  function handleAnimationPosition(){
    animation.value= Math.random() * (WIDTH -100);
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title='mover' onPress={handleAnimationPosition} />

    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})