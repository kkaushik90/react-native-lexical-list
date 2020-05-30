import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

export interface AlphabetListProps {
  data: (string | number)[];
  itemHeight: number;
  itemStyle?: StyleProp<TextStyle>;
  onItemSelect: (item: string | number, index: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AlphabetList = ({
  data,
  itemHeight,
  itemStyle,
  onItemSelect,
  containerStyle,
}: AlphabetListProps) => {
  const setSelectedItem = useState(data[0])[1];

  const onPanGestureEvent = (e) => {
    calculateAndUpdateSelectedItem(e.nativeEvent.y);
  };

  const calculateAndUpdateSelectedItem = (positionY: number) => {
    const itemIndex = Math.floor(positionY / itemHeight);
    if (itemIndex >= 0 && itemIndex < data.length) {
      onItemSelected(data[itemIndex], itemIndex);
    }
  };

  const onItemSelected = (newItem: string | number, index: number) => {
    setSelectedItem((prevState) => {
      if (prevState !== newItem) {
        onItemSelect(newItem, index);
        return newItem;
      }
      return prevState;
    });
  };

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <View style={[{ alignItems: "center" }, containerStyle]}>
        {data.map((item, index) => (
          <TouchableOpacity
            style={{ height: itemHeight }}
            key={item}
            onPress={() => onItemSelected(item, index)}
          >
            <Text style={[itemStyle, { maxHeight: itemHeight }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </PanGestureHandler>
  );
};
