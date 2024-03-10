/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  const t = useSharedValue(0);

  const infinityStyle = useAnimatedStyle(() => {
    t.value += 0.05;
    const scale = (2 / (3 - Math.cos(2 * t.value))) * 150;
    return {
      transform: [
        {translateX: scale * Math.cos(t.value)},
        {translateY: scale * (Math.sin(2 * t.value) / 2)},
      ],
    };
  });

  const pan = Gesture.Pan().onBegin(() => {
    console.log('onBegin');
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <Animated.View style={[styles.dot, infinityStyle]} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  dot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#b58df1',
    position: 'absolute',
  },
});
