import React, { useRef, useState } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';

export default function VerticalSlider({
  min = 0,
  max = 100,
  step = 1,
  initial = 50,
  height = 200,
  onValueChange,
}) {
  const [value, setValue] = useState(initial);
  const [sliderY, setSliderY] = useState(
    ((max - initial) / (max - min)) * height
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let y = gestureState.dy + sliderY;
        y = Math.max(0, Math.min(height, y));
        const newValue = Math.round(
          max - ((y / height) * (max - min)) / step
        ) * step;
        setSliderY(y);
        setValue(newValue);
        if (onValueChange) onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View style={[styles.container, { height }]}> 
      <View style={styles.track} />
      <View
        style={[
          styles.thumb,
          { top: sliderY - 15 }, // -15 เพื่อให้ thumb อยู่ตรงกลาง
        ]}
        {...panResponder.panHandlers}
      />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  track: {
    width: 8,
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 4,
    position: 'absolute',
    left: 26,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1fb28a',
    position: 'absolute',
    left: 15,
    zIndex: 2,
  },
  value: {
    position: 'absolute',
    bottom: -30,
    fontSize: 16,
    color: '#333',
  },
}); 